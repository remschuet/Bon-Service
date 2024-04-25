import { RecipeBook } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// RecipeBook
////////////////////////////////

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
        description: recipeBook.description,
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

/**
 * Delete a specific RecipeBook.
 * @param recipeBook - The RecipeBook to be deleted.
 * @returns A promise that resolves to the deleted RecipeBook.
 */
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

/**
 * Delete a RecipeBook that match the given userId and name (unique together).
 * @param userId - The userId of the RecipeBook to be deleted.
 * @param name - The name of the RecipeBook to be deleted.
 * @returns A promise that resolves to the deleted RecipeBook.
 */
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
 * Deletes all RecipeBooks associated with the given userId.
 * 
 * @param userId - The userId of the RecipeBooks to be deleted.
 * @returns A promise that resolves to the deleted RecipeBooks.
 */
export async function deleteAllRecipeBook(userId: string){
  try {
    return await db.recipeBook.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/recipe: deleteAllRecipeBook(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get a RecipeBook by id.
 * @param recipeBookId - The recipeBook id.
 * @returns a recipeBook object.
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
