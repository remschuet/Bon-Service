"use server";

import {
  createIngredient,
  getIngredientIfExist,
  updateIngredientPrice,
} from "@/db/data-access/ingredient";

import { Ingredient } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";

/**
 * Adds an ingredient to the system.
 * @param formData - The form data containing the ingredient details.
 * @returns An object indicating the status of the operation.
 */

export async function addIngredient(formData: FormData) {
  /**
   * Checks and converts the unit if necessary.
   * @param unit - The unit to check.
   * @returns The converted unit if necessary, otherwise the original unit.
   */

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
    unit: await checkUnit(unit),
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

/**
 * Creates or updates an ingredient.
 * If the ingredient already exists, it updates the price.
 * If the ingredient doesn't exist, it creates a new ingredient.
 *
 * @param ingredient - The ingredient to create or update.
 */
export async function createOrUpdateIgredient(ingredient: Ingredient) {
  if (
    await getIngredientIfExist(
      ingredient.name,
      ingredient.userId,
      ingredient.supplierName
    )
  ) {
    updateIngredientPrice(
      ingredient.name,
      ingredient.userId,
      ingredient.supplierName,
      ingredient.price
    );
  } else {
    createIngredient(ingredient);
    return { success: "Ingrédient ajouté avec succès", status: 200 };
  }
}

export const checkUnit = (unit: string) => {
  if (unit === "G") {
    return "KG";
  } else if (unit === "ML") {
    return "L";
  }
  return unit;
};
