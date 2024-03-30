"use server";

import {} from "@/db/data-access/action";
import {
  createIngredient,
  getAllIngredient,
  getIngredientIfExist,
  updateIngredientPrice,
} from "@/db/data-access/ingredient";

import { Ingredient } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";

export async function addIngredient(formData: FormData) {
  const checkUnit = (unit: string) => {
    if (unit === "G") {
      return "KG";
    } else if (unit === "ML") {
      return "L";
    }
    return unit;
  };

  let price =
    parseFloat(formData.get("price") as string) /
    (parseInt(formData.get("quantity") as string) *
      (formData.get("amount-unit") !== null
        ? parseInt(formData.get("amount-unit") as string)
        : 1));

  const unit = formData.get("unit") as string;

  price = unit === "G" || unit === "ML" ? price * 1000 : price;

  const ingredient = {
    name: formData.get("name") as string,
    price: parseFloat(price.toFixed(5)),
    unit: checkUnit(unit),
    category: formData.get("category") as string,
    origin: formData.get("origin") as string,
    supplierName: formData.get("supplierName") as string,
    userId: formData.get("userId") as string,
  };

  const validatedIngredient = IngredientSchema.safeParse(ingredient);

  if (!validatedIngredient.success) {
    return { error: "Les données saisies sont invalides.", status: 400 };
  }

  createOrUpdateIgredient(validatedIngredient.data as Ingredient);

  return { success: "Ingrédient ajouté avec succès", status: 200 };
}

// Create or update ingredient or price
async function createOrUpdateIgredient(ingredient: Ingredient) {
  if (
    await getIngredientIfExist(
      ingredient.name,
      ingredient.userId,
      ingredient.supplierName
    )
  ) {
    // Avertissement usagé ?
    console.log("L'ingredient existe deja");
    updateIngredientPrice(
      ingredient.name,
      ingredient.userId,
      ingredient.supplierName,
      ingredient.price
    );
  } else {
    createIngredient(ingredient);
  }
}

// return all ingredients for a specific id
export async function getIngredients(userId: string) {
  return await getAllIngredient(userId);
}
