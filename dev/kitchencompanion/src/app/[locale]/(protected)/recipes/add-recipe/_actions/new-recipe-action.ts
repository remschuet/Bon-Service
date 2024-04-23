"use server";

import { Recipe, RecipeState, Unit } from "@prisma/client";
import { IngredientDTO } from "@/lib/type";

import { createRecipe } from "@/db/data-access/recipe";

export async function addRecipe(newRecipe: FormData) {
  const recipe = {
    id: crypto.randomUUID(),
    name: newRecipe.get("name") as string,
    cost: parseFloat(newRecipe.get("cost") as string),
    yield: parseInt(newRecipe.get("yield") as string),
    unit: newRecipe.get("unit") as Unit,
    description: newRecipe.get("description") as string,
    recipeBookId: newRecipe.get("recipeBook") as string,
    recipeState: newRecipe.get("recipeType") as RecipeState,
    preparationTime: parseInt(newRecipe.get("prepTime") as string),
    cookingTime: parseInt(newRecipe.get("cookTime") as string),
    steps: newRecipe.get("steps") as string,
    versionNumber: newRecipe.get("version") as string,
  };

  const ingredients: IngredientDTO[] = JSON.parse(
    newRecipe.get("ingredients") as string
  ) as IngredientDTO[];

  try {
    await createRecipe(recipe as Recipe, ingredients);
  } catch (error) {
    console.error("Failed to add recipe:", error);
  }
}
