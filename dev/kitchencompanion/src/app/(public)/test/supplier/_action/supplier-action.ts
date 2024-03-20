"use server";

import {
  getAllIngredientBySupplierId,
  getPriceIngredientById,
} from "@/db/data-access/ingredient";

import { getSupplier } from "@/db/data-access/supplier";

export async function actionGetIngredients(supplierId: string) {
  return await getAllIngredientBySupplierId(supplierId);
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
