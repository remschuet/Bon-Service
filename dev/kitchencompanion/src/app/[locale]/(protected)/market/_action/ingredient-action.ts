"use server";

import {} from "@/db/data-access/action";
import {
  createIngredient,
  getAllIngredient,
} from "@/db/data-access/ingredient";

import { Ingredient } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function addIngredient(formData: FormData) {
  const price =
    parseFloat(formData.get("price") as string) /
    (parseInt(formData.get("quantity") as string) *
      (formData.get("amount-unit") !== null
        ? parseInt(formData.get("amount-unit") as string)
        : 1));

  const unit = formData.get("unit") as string;

  const ingredient = {
    name: formData.get("name") as string,
    price: parseFloat(price.toFixed(5)),
    unit: unit,
    category: formData.get("category") as string,
    origin: formData.get("origin") as string,
    supplierName: formData.get("supplierName") as string,
    userId: formData.get("userId") as string,
  };

  const validatedIngredient = IngredientSchema.safeParse(ingredient);

  if (!validatedIngredient.success) {
    return { error: "Les données saisies sont invalides.", status: 400 };
  }

  createIngredient(validatedIngredient.data as Ingredient);

  revalidatePath("/market");
  return { success: "Ingrédient ajouté avec succès", status: 200 };
}

// return all ingredients for a specific id
export async function getIngredients(userId: string) {
  return await getAllIngredient(userId);
}
