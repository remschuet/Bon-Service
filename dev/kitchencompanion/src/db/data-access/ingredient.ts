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
  return await db.ingredient.create({
    data: {
      name: ingredient.name,
      unitPrice: ingredient.unitPrice,
      unitMeasure: ingredient.unitMeasure,
      supplierName: ingredient.supplierName,
      userId: ingredient.userId,
    },
  });
}

export async function getAllIngredientBySupplierNameAndUserId(
  supplierName: string,
  userId: string
) {
  return await db.ingredient.findMany({
    where: {
      supplierName: supplierName,
      userId: userId,
    },
  });
}

export async function getAllIngredientByUserId(userId: string) {
  return await db.ingredient.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getPriceIngredientById(ingredientId: string) {
  return await db.ingredient.findFirst({
    where: {
      id: ingredientId,
    },
  });
}
