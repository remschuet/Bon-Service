"use server";

import { getAllIngredient } from "@/db/data-access/ingredient";
import { getAllRecipeByRecipeBookIds } from "@/db/data-access/recipe";
import { getAllRecipeBookByUserId } from "@/db/data-access/recipe-book";
import { Ingredient } from "@/lib/composite/ingredient";
import { Recipe, RecipeData } from "@/lib/composite/recipe";

export async function getRecipeComponents(id: string) {
  try {
    const recipes = await getRecipes(id);

    if (!recipes) {
      return [];
    }
    const recipeComponents = recipes.map((recipe) => {
      const recipeData: RecipeData = {
        id: recipe.id,
        cost: recipe.cost,
        yield: recipe.yield,
        unit: recipe.unit,
        description: recipe.description,
        recipeBook: recipe.recipeBookId,
        recipeType: recipe.recipeState,
        prepTime: recipe.preparationTime,
        cookTime: recipe.preparationTime,
        steps: JSON.parse(recipe.steps),
        version: recipe.versionNumber,
      };

      const recipeComponent = new Recipe();
      recipeComponent.recipeData = recipeData;
      recipeComponent.name = recipe.name;

      return recipeComponent;
    });
    return recipeComponents;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
}

export async function getIngredientComponents(id: string) {
  try {
    const result = await getIngredients(id);

    if (!result) {
      return [];
    }

    const ingredientComponent = result.map((ingredient) => {
      const ingredientData = {
        id: ingredient.id,
        name: ingredient.name,
        unit: ingredient.unit,
        price: ingredient.price,
      };
      return new Ingredient(ingredientData);
    });

    return ingredientComponent;
  } catch (error) {
    console.error(error);
  }
}
/**
 * Retrieves all ingredients for a given user.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of ingredients, or an object with an error message and status code if an error occurs.
 */
async function getIngredients(userId: string) {
  try {
    return await getAllIngredient(userId);
  } catch (error) {
    throw error;
  }
}

async function getRecipes(userId: string) {
  try {
    // Get recipe book id for admin
    const recipeBooks = await getAllRecipeBookByUserId(userId);
    if (recipeBooks && recipeBooks.length > 0) {
      const recipeBookIds = recipeBooks.map((recipeId) => recipeId.id);
      // get all recipes for admin
      return await getAllRecipeByRecipeBookIds(recipeBookIds);
    }
    return [];
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllRecipeByAdminId(), error: ",
      error
    );
  }
}
