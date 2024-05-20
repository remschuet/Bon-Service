"use server";

import { getAllIngredient } from "@/db/data-access/ingredient";
import {
  getAllRecipeByRecipeBookIds,
  getRecipeIngredientAndRecipe,
} from "@/db/data-access/recipe";
import { getAllRecipeBookByUserId } from "@/db/data-access/recipe-book";
import { Ingredient } from "@/lib/composite/ingredient";
import { Recipe, RecipeData } from "@/lib/composite/recipe";

export async function getRecipeComponents(id: string) {
  try {
    const { filteredRecipes, recipeIngredients } = await getRecipes(id);

    if (!filteredRecipes) {
      return { recipeComponents: [], recipeIngredients: [] };
    }

    const recipeComponents = filteredRecipes.map((recipe) => {
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

    return { recipeComponents, recipeIngredients };
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    throw error; // Propagate the error
  }
}

export async function getIngredientComponents(userId: string) {
  try {
    const result = await getAllIngredient(userId);

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

async function getRecipes(userId: string) {
  try {
    const recipeBooks = await getAllRecipeBookByUserId(userId);

    if (recipeBooks && recipeBooks.length > 0) {
      const recipeBookIds = recipeBooks.map((recipeId) => recipeId.id);
      const recipes = await getAllRecipeByRecipeBookIds(recipeBookIds);

      const filteredRecipes = recipes.filter(
        (recipe) => recipe.recipeState === "RECIPE"
      );

      // Retrieve ingredients for each recipe concurrently
      const recipeIngredients = await Promise.all(
        filteredRecipes.map(async (recipe) => {
          return await getRecipeIngredientAndRecipe(recipe.id);
        })
      );

      return { filteredRecipes, recipeIngredients };
    }
    return { recipes: [], recipeIngredients: [] };
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllRecipeByAdminId(), error: ",
      error
    );
    throw error; // Propagate the error
  }
}
