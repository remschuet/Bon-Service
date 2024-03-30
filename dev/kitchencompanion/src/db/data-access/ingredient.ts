import { Ingredient, UnitMeasure } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Ingredient
////////////////////////////////

/**
 * Creates a new ingredient in the database.
 * @param ingredient - The ingredient object containing the ingredient's details.
 * @returns A promise that resolves to the created ingredient
 */
export async function createIngredient(ingredient: Ingredient) {
  try {
    return await db.ingredient.create({
      data: {
        name: ingredient.name,
        price: ingredient.price,
        unit: ingredient.unit,
        category: ingredient.category,
        origin: ingredient.origin,
        supplierName: ingredient.supplierName,
        userId: ingredient.userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: createIngredient(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all ingredient by supplier name and userId
 * @param supplierName - The name of the ingredient's supplier.
 * @param userId - The id of the user who owns the ingredients.
 *@returns An array of ingredients
 */
export async function getAllIngredientBySupplierNameAndUserId(
  supplierName: string,
  userId: string
) {
  try {
    return await db.ingredient.findMany({
      where: {
        supplierName: supplierName,
        userId: userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: getAllIngredientBySupplierNameAndUserId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get if specific ingredient exist.
 * @param name - The name of the ingredient to retrieve.
 * @param userId - The id of the user who owns the ingredients.
 * @param supplierName - The name of the ingredient's supplier.
 * @returns true or false.
 */
export async function getIngredientIfExist(
  name: string,
  userId: string,
  supplierName: string
): Promise<boolean> {
  try {
    const isExisting = await db.ingredient.findFirst({
      where: {
        name: name,
        userId: userId,
        supplierName: supplierName,
      },
    });
    console.log("values:", isExisting);

    return !!isExisting;
  } catch (error) {
    console.error(
      "Error data-access/ingredient: getIngredient(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all ingredient by userId
 * @param userId - The id of the user who owns the ingredients.
 * @returns A promise that resolves to the created ingredient
 */
export async function getAllIngredient(userId: string) {
  try {
    return await db.ingredient.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: getAllIngredient(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get an ingredient by its ID.
 * @param ingredientId - The ID of the ingredient to retrieve.
 * @returns The retrieved ingredient, or null.
 */
export async function getPriceIngredientById(ingredientId: string) {
  try {
    return await db.ingredient.findFirst({
      where: {
        id: ingredientId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: getPriceIngredientById(), error: ",
      error
    );
    throw error;
  }
}

export async function updateIngredientPrice(
  name: string,
  userId: string,
  supplierName: string,
  price: number
) {
  try {
    return await db.ingredient.updateMany({
      where: {
        name,
        userId,
        supplierName,
      },
      data: {
        price,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: updateIngredientPrice(), error: ",
      error
    );
    throw error;
  }
}
