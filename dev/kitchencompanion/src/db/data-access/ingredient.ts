import { Ingredient, UnitMeasure } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Ingredient
////////////////////////////////

/**
 * @description
 * @Table Kitchen
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
