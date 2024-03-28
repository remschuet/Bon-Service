"use server";

import {} from "@/db/data-access/action";
import { createIngredient } from "@/db/data-access/ingredient";
import { Ingredient } from "@prisma/client";

export async function actionCreateIngredient(ingredient: Ingredient) {
  createIngredient(ingredient);
}
