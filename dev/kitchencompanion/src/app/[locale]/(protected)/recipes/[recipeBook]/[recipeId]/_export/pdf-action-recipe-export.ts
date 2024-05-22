"use server";

import {
  getRecipe,
  getRecipeIngredientAndRecipeName,
} from "@/db/data-access/recipe";

export async function exportGetRecipe(id: string) {
  try {
    const recipe = await getRecipe(id);
    const ingredients = await getRecipeIngredientAndRecipeName(id);
    return { recipe, ingredients };
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
}
