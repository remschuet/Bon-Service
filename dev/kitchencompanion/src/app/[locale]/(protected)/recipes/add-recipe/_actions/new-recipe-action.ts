"use server";

import { Recipe, RecipeState, Unit } from "@prisma/client";
import { IngredientDTO, ResponseMessage } from "@/lib/type";

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
    return {
      success: "La recette a été ajoutée avec succès.",
      status: 200,
    } as ResponseMessage;
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de l'ajout de la recette.",
      status: 500,
    } as ResponseMessage;
  }
}
