/////////// ALGO ////////////

import { getAllRecipeFromIngredient, getAllRecipeFromRecipeIngredient, getRecipeIngredientAndRecipe } from "../recipe";

/* Objectif
 * On donne un ingredient à updater
 * On va chercher la liste des recettes au top qui sont à updater
 * Pour chaque recettes on descend afficher (action) chaque sous recettes et ingredients
 * On peut donc créer un arbre composite avec tout les data
 */
export async function entryPointAlgo(ingredientId: string) {
  const recipesParent = await getAllParentRecipe(ingredientId);
  recipesParent.forEach((recipes) => {
    getItemsToUpdate3(recipes);
  });
}

/**
 * This function is used to get the the parent recipe top for ingredientId.
 * It starts by calling the `process` function with the provided `recipeParentId`.
 * @param ingredientId - The id of the ingredient.
 * @returns list of the parentRecipe
 */
export async function getAllParentRecipe(ingredientId: string) {
  let parentRecipe: string[] = [];
  const recipeIds = await getAllRecipeFromIngredient(ingredientId);
  // process
  recipeIds.forEach((recipeId) => {
    process(recipeId);
  });
  // Fonction récursive pour remonter au top des recette
  async function process(recipeId: string) {
    let dbData = await getAllRecipeFromRecipeIngredient(recipeId);
    // En haut de la liste
    if (!dbData.length) {
      parentRecipe.push(recipeId);
      return;
    }
    dbData.forEach(function (recipe) {
      process(recipe);
    });
  }
  return parentRecipe;
}

/**
 * This function is used to get the ingredient to a specific recipe.
 * It starts by calling the `process` function with the provided `recipeParentId`.
 * This function is recursive and it will traverse through all the ingredients and recipes related to the given recipe.
 * This will print the entirely the tree of the parent recipe
 * @param recipeParentId - The id of the parent recipe.
 * @returns nothing
 */
export async function getItemsToUpdate3(recipeParentId: string) {
  // appel initial de la recursivité
  await process(recipeParentId);

  /**
   * This function is recursive and it is used to traverse through all the ingredients and recipes related to the given recipe.
   * It starts by checking if the `recipeId` is empty, if so, it returns.
   * Then it fetches the data for the current recipeId an recall himself.
   * Finally, it calls the `processRecipeIngredients` function recursively for each recipeIngredient in the current recipeId's data.
   *
   * @param recipeId - The id of the recipe.
   * @returns Nothing.
   */
  async function process(recipeId: string) {
    // Si recipeId est vide, sortir de la fonction récursive
    if (!recipeId) return;

    // Obtenir les données pour le recipeId actuel
    let dbData = await getRecipeIngredientAndRecipe(recipeId);

    // Constuire ingrédients
    for (let ingredient in dbData.ingredients) {
      console.log(ingredient);
    }

    // Constuire recette (savoir que cette recette est dans la current)
    for (let recipeIngredient in dbData.recipeIngredients) {
      console.log(recipeIngredient);
    }

    // For recette call recursivité
    for (let recipeIngredient in dbData.recipeIngredients) {
      await process(recipeIngredient);
    }
  }
}