"use server";

import {
  createNotification,
  getNotifications,
} from "@/db/data-access/notifications";
import { NotifTypes, Notification, Unit } from "@prisma/client";
import {
  checkUnit,
  createOrUpdateIgredient,
} from "@/app/[locale]/(protected)/market/_action/ingredient-action";
import { Ingredient } from "@prisma/client";

export default async function processReceipt(formData: FormData) {
  const headers = new Headers();
  headers.append("X-App-Name", "bonservice");
  headers.append("X-Api-Key", process.env.RECEIPT_EXTRACTOR_API_KEY as string);
  headers.append("X-Supplier", formData.get("supplier") as string);

  const userId = formData.get("userId") as string;

  try {
    const response = await fetch(
      "http:www.juliencm.dev:5000/api/process-receipts",
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    );

    if (response.status === 200) {
      const data = await response.json();

      if (data.error) {
        return {
          error: "Une erreur est survenue lors de la réception de votre reçu.",
          status: 400,
        };
      }

      data.forEach(async (ingredient: any) => {
        let price = ingredient.price / ingredient.quantity;

        console.log(ingredient.unit);

        price =
          ingredient.unit === "G" || ingredient.unit === "ML"
            ? price * 1000
            : price;

        const newIngredient = {
          name: ingredient.name,
          price: parseFloat(price.toFixed(5)),
          unit: ingredient.unit as Unit,
          category: ingredient.category,
          origin: ingredient.origin,
          supplierName: formData.get("supplier") as string,
          userId: userId,
        };

        await createOrUpdateIgredient(newIngredient as Ingredient);
      });

      createNotification({
        userId: userId,
        type: NotifTypes.GENERAL_UPDATE,
        content: "Vos ingrédients ont été ajouté avec succès.",
      } as Notification);

      return {
        success: "Vos ingrédients ont été ajouté avec succès.",
        status: 200,
      };
    } else {
      return {
        error: "Une erreur est survenue lors de la transmission de votre reçu.",
        status: 400,
      };
    }
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la transmission de votre reçu.",
      status: 400,
    };
  }
}

export async function getAllNotifications(userId: string) {
  return await getNotifications(userId);
}
