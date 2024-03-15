"use server";

import {
  getIngredientsBySupplierId,
  getPriceIngredientById,
} from "@/data-access/ingredient";

import { getSupplier } from "@/data-access/supplier";

export async function actionGetIngredients(supplierId: string) {
  return await getIngredientsBySupplierId(supplierId);
}

export async function actionGetPriceIngredientById(ingredientId: string) {
  const ingredient = await getPriceIngredientById(ingredientId);
  return ingredient;
}

export async function actiionGetSupplierNameById(supplierName: string) {
  const supplier = await getSupplier(supplierName);
  if (supplier) {
    return supplier.id;
  }
}
