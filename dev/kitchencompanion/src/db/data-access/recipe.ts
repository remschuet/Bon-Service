import { RecipeBook, Allergen, Recipe } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";

/**
 * Creates a new RecipeBook.
 * @param recipeBook - The recipeBook object containing the recipeBook's details.
 * @returns A promise that resolves to the created user.
 */
export async function createRecipeBook(recipeBook: RecipeBook) {
  try {
    return await db.recipeBook.create({
      data: {
        name: recipeBook.name,
        userId: recipeBook.userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: createRecipeBook(), error: ",
      error
    );
    throw error;
  }
}

export async function deleteRecipeBook(recipeBook: RecipeBook) {
  try {
    return await db.recipeBook.delete({
      where: { id: recipeBook.id },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: deleteRecipeBook(), error: ",
      error
    );
    throw error;
  }
}

export async function deleteRecipeBookByUserIdAndName(
  userId: string,
  name: string
) {
  try {
    return await db.recipeBook.deleteMany({
      where: { userId, name },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: deleteRecipeBookByUserIdAndName(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get a RecipeBook by id.
 * @param recipeBookId - The recipeBook id.
 * @returns a recipeBook.
 */
export async function getRecipeBookById(recipeBookId: string) {
  try {
    return await db.recipeBook.findFirst({
      where: { id: recipeBookId },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeBookById(), error: ",
      error
    );
    throw error;
  }
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
  try {
    return await db.recipeBook.findFirst({
      where: {
        name: recipeBookName,
        userId: userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeBookByName(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all RecipeBook by userId.
 * @param userId - The user id
 * @returns a lists of recipeBook.
 */
export async function getAllRecipeBookByUserId(userId: string) {
  try {
    return await db.recipeBook.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getAllRecipeBookByUserId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Create a Recipe.
 * @param recipe - The recipe object containing the recipes's details.
 * @returns A promise that resolves to the created recipe.
 */
export async function createRecipe(recipe: Recipe) {
  try {
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
  } catch (error) {
    console.error("Error data-access/recipe: createRecipe(), error: ", error);
    throw error;
  }
}

/**
 * link recipe to alergen.
 * @param recipe - The recipe object containing the recipes's details.
 * @param allergen - An element of the allergen enum
 */
export async function linkRecipeAllergen(recipe: Recipe, allergen: Allergen) {
  try {
    return await db.recipeAllergen.create({
      data: {
        recipeId: recipe.id,
        allergen: allergen,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: linkRecipeAllergen(), error: ",
      error
    );
    throw error;
  }
}

/**
 * link recipe to photo.
 * @param recipe - The recipe object containing the recipes's details.
 * @param photo - The Amazon S3 key for the photo
 */
export async function linkRecipePhoto(recipe: Recipe, photo: string) {
  try {
    return await db.recipePhoto.create({
      data: {
        recipeId: recipe.id,
        photo: photo,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: linkRecipePhoto(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Create RecipeCategory
 * @param userId - The id of the user.
 * @param category - An string describing the category
 */
export async function createRecipeCategory(userId: string, category: string) {
  try {
    return await db.recipeCategory.create({
      data: {
        userId: userId,
        category: category,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: createRecipeCategory(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all the categories for an user.
 * @param userId - the user id.
 */
export async function getRecipeCategoriesByUserId(userId: string) {
  try {
    return await db.recipeCategory.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: getRecipeCategoriesByUserId(), error: ",
      error
    );
    throw error;
  }
}
