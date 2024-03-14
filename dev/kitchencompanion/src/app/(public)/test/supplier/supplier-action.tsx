"use serveur";

import {
  getIngredientsBySupplierId,
  getPriceIngredientById,
} from "@/data-access/ingredient";

export async function actionGetIngredients(supplierId: string) {
  return await getIngredientsBySupplierId(supplierId);
}

export async function actionGetPriceIngredientById(ingredientId: string) {
  const ingredient = await getPriceIngredientById(ingredientId);
  return ingredient;
}
