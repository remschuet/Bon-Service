import { RecipeBook, Allergen, Recipe } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";

/**
 * Creates a new RecipeBook.
 * @param recipeBook - The recipeBook object containing the recipeBook's details.
 * @returns A promise that resolves to the created user.
 */
export async function createRecipeBook(recipeBook: RecipeBook) {
  return await db.recipeBook.create({
    data: {
      name: recipeBook.name,
      userId: recipeBook.userId,
    },
  });
}

/**
 * Get a RecipeBook by id.
 * @param recipeBookId - The recipeBook id.
 * @returns a recipeBook.
 */
export async function getRecipeBookById(recipeBookId: string) {
  return await db.recipeBook.findFirst({
    where: { id: recipeBookId },
  });
}

/**
 * Get a RecipeBook by name.
 * @param recipeBookName - The recipeBook name.
 * @param userId - The user id
 * @returns a recipeBook.
 */
export async function getRecipeBookByName(
  recipeBookName: string,
  userId: string
) {
  return await db.recipeBook.findFirst({
    where: {
      name: recipeBookName,
      userId: userId,
    },
  });
}

/**
 * Get all RecipeBook by userId.
 * @param userId - The user id
 * @returns a lists of recipeBook.
 */
export async function getRecipeBooksByUserId(userId: string) {
  return await db.recipeBook.findMany({
    where: { userId: userId },
  });
}

/**
 * Create a Recipe.
 * @param recipe - The recipe object containing the recipes's details.
 * @returns A promise that resolves to the created recipe.
 */
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

/**
 * link recipe to alergen.
 * @param recipe - The recipe object containing the recipes's details.
 * @param allergen - An element of the allergen enum
 */
export async function linkRecipeAllergen(recipe: Recipe, allergen: Allergen) {
  return await db.recipeAllergen.create({
    data: {
      recipeId: recipe.id,
      allergen: allergen,
    },
  });
}

/**
 * link recipe to photo.
 * @param recipe - The recipe object containing the recipes's details.
 * @param photo - The Amazon S3 key for the photo
 */
export async function linkRecipePhoto(recipe: Recipe, photo: string) {
  return await db.recipePhoto.create({
    data: {
      recipeId: recipe.id,
      photo: photo,
    },
  });
}

/**
 * Create RecipeCategory
 * @param userId - The id of the user.
 * @param category - An string describing the category
 */
export async function createRecipeCategory(userId: string, category: string) {
  return await db.recipeCategory.create({
    data: {
      userId: userId,
      category: category,
    },
  });
}

/**
 * Get all the categories for an user.
 * @param userId - the user id.
 */
export async function getRecipeCategoriesByUserId(userId: string) {
  return await db.recipeCategory.findMany({
    where: { userId: userId },
  });
}
