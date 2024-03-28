"use server";

import {} from "@/db/data-access/action";
import {
  createIngredient,
  getAllIngredient,
} from "@/db/data-access/ingredient";
import { Ingredient } from "@prisma/client";

// Create new ingredient in database
export async function actionCreateIngredient(ingredient: Ingredient) {
  createIngredient(ingredient);
}

// return all ingredients for a specific id
export async function actionGetAllIngredient(userId: string) {
  getAllIngredient(userId);
}
