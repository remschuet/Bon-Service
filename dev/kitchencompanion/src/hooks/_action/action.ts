"use server";

import { getAllContact } from "@/db/data-access/contact";
import { getAllIngredient } from "@/db/data-access/ingredient";
import { getAllKitchenByAdminId } from "@/db/data-access/kitchen";
import {
  getAllRecipeBookByUserId,
  getRecipeBookById,
} from "@/db/data-access/recipe-book";
import { getAllRecipeByRecipeBookIds } from "@/db/data-access/recipe";

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
/**
 * Retrieves all kitchens associated with a specific user ID.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of kitchens.
 * @throws If an error occurs while retrieving the kitchens.
 */
export async function getAllMemberKitchensById(userId: string) {
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

export async function getAllRecipeByBooksId(recipeBookId: string) {
  try {
    const recipes = await getAllRecipeByRecipeBookIds([recipeBookId]);
    return recipes;
  } catch (error) {
    throw error;
  }
}

export async function getRecipeBookOwner(recipeBookId: string) {
  try {
    const recipeBooks = await getRecipeBookById(recipeBookId);
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
