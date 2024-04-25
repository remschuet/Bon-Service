"use server";
import { getAllRecipeByRecipeBookIds } from "@/db/data-access/recipe";

import { getAllRecipeBookByUserId } from "@/db/data-access/recipe-book";

/////////// DASHBOARD ///////////
// kitchen: getAllKitchenByAdminId() -> return all kitchens created by specified admin
export async function getAllRecipeByAdminId(adminId: string) {
  try {
    // Get recipe book id for admin
    const recipeBooks = await getAllRecipeBookByUserId(adminId);
    if (recipeBooks && recipeBooks.length > 0) {
      const recipeBookIds = recipeBooks.map((recipeId) => recipeId.id);
      // get all recipes for admin
      const recipes = getAllRecipeByRecipeBookIds(recipeBookIds);
      console.log("recipes: " + recipes);
      return recipes;
    }
    return [];
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllRecipeByAdminId(), error: ",
      error
    );
  }
}
