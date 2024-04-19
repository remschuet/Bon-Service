"use server";

import { getAllContact } from "@/db/data-access/contact";
import { getAllIngredient } from "@/db/data-access/ingredient";
import { getAllKitchenByAdminId } from "@/db/data-access/kitchen";
import { getAllRecipeBookByUserId } from "@/db/data-access/recipe-book";
import { getAllRecipeByAdminId } from "@/db/data-access/actions/action";
import { getAllRecipeByRecipeBookIds } from "@/db/data-access/recipe";
import { Recipe } from "@prisma/client";

/**
 * Retrieves all kitchens associated with a specific user ID.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of kitchens.
 * @throws If an error occurs while retrieving the kitchens.
 */
export async function getAllKitchensById(userId: string) {
  try {
    const kitchens = await getAllKitchenByAdminId(userId);
    return kitchens;
  } catch (error) {
    throw error;
  }
}

export async function getAllRecipeBooksById(userId: string) {
  try {
    const recipeBooks = await getAllRecipeBookByUserId(userId);
    return recipeBooks;
  } catch (error) {
    throw error;
  }
}

/**
 * Returns all the contact of the user. (ADMIN)
 * @param userId - the ID of the user
 */
export async function getAllContactForAdmin(userId: string) {
  try {
    return await getAllContact(userId);
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all ingredients for a given user.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of ingredients, or an object with an error message and status code if an error occurs.
 */
export async function getIngredients(userId: string) {
  try {
    return await getAllIngredient(userId);
  } catch (error) {
    throw error;
  }
}

export async function getRecipes(userId: string) {
  try {
    // Get recipe book id for admin
    const recipeBooks = await getAllRecipeBookByUserId(userId);
    if (recipeBooks && recipeBooks.length > 0) {
      const recipeBookIds = recipeBooks.map((recipeId) => recipeId.id);
      // get all recipes for admin
      return (await getAllRecipeByRecipeBookIds(recipeBookIds)) as Recipe[];
    }
    return [];
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllRecipeByAdminId(), error: ",
      error
    );
  }
}
