import { RecipeBook, Recipe, UnitMeasure } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { number } from "zod";
import { Prisma } from "@prisma/client";

export async function createRecipeBook(kitchen: RecipeBook) {
  return await db.recipeBook.create({
    data: {
      name: kitchen.name,
      userId: kitchen.userId,
    },
  });
}

export async function createRecipe(recipe: Recipe) {
  let steps = recipe.steps as Prisma.JsonArray;
  let ingredients = recipe.ingredients as Prisma.JsonArray;

  return await db.recipe.create({
    data: {
      versionNumber: recipe.versionNumber,
      name: recipe.name,
      recipeBookId: recipe.recipeBookId,
      recipeCategoryId: recipe.recipeCategoryId,
      recipeState: recipe.recipeState,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      steps: steps,
      ingredients: ingredients,
      yield: recipe.yield,
      unitMeasure: recipe.unitMeasure,
      objInvestment: recipe.objInvestment,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    },
  });
}
