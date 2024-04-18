"use server";

import { Ingredient, Contact, SupplierSupported } from "@prisma/client";
import { db } from "@/db/prisma-db";
import {
  createManySupplier,
  createSupplier,
  getAllSupplierSupported,
  getSupplier,
  deleteAllSupplierByUserId,
  removeSupplier,
} from "@/db/data-access/supplier";
import { getUserById } from "@/db/data-access/user";

import { Supplier, RecipeBook, User } from "@prisma/client";
import {
  getAllRecipeByRecipeBookIds,
  getAllRecipeFromIngredient,
  getRecipeIngredientAndRecipe,
  getAllRecipeFromRecipeIngredient,
} from "@/db/data-access/recipe";

import {
  createRecipeBook,
  deleteRecipeBookByUserIdAndName,
  getAllRecipeBookByUserId,
} from "@/db/data-access/recipe-book";

import {
  createContact,
  createManyContact,
  deleteAllContact,
  getContact,
  linkContactKitchen,
} from "@/db/data-access/contact";
import {
  getAllKitchenByAdminId,
  getKitchenByAdminAndName,
  linkKitchenUserById,
} from "@/db/data-access/kitchen";

/////////// ALGO ////////////

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

/////////// ALGO TEST SAVE ////////////

export async function getItemsToUpdate2(recipeParentId: string) {
  let havingRecipe = true;

  while (havingRecipe) {
    let data = await getRecipeIngredientAndRecipe(recipeParentId);
    let recipeIngredientList = data.recipeIngredients;
    let ingredientList = data.ingredients;

    // print ingredientId
    for (let ingredient in ingredientList) {
      console.log(ingredient);
    }

    for (let recipe in recipeIngredientList) {
      let data = await getRecipeIngredientAndRecipe(recipeParentId);
    }
  }
}

export async function getItemsToUpdate(ingredientId: string) {
  // chercher les recettes qui contiennent l ingredient
  const recipeIds = await getAllRecipeFromIngredient(ingredientId);
  // Monter
  const recipesParentIds = getAllRecipeFromRecipeIngredient(""); // recipeIds
  // descendre
  for (let recipeId in recipeIds) {
    // Chercher les recettes (parents) des recetteIngredients
    let data = await getRecipeIngredientAndRecipe(recipeId);
    data.ingredients;
    data.recipeIngredients;
    let ingredient = ["ingredient1", "ingredient2", "recipe1"]; // chercher les ingredients et les recettes des recettes
    for (let recipe in ingredient) {
      if (recipe == "Recette") {
        while (ingredient) {
          // contain("recipe")) {
          ingredient = ["ingredient1", "ingredient2", "recipe1"]; // chercher des ingredients
        }
      }
    }
  }
}

/////////// DASHBOARD ///////////
// kitchen: getAllKitchenByAdminId() -> return all kitchens created by specified admin
export async function getAllRecipeByAdminId(adminId: string) {
  try {
    // Get recipe book id for admin
    const recipeBooks = getAllRecipeBookByUserId(adminId);
    if (recipeBooks && (await recipeBooks).length > 0) {
      const recipeBookIds = (await recipeBooks).map((recipeId) => recipeId.id);
      // get all recipes for admin
      const recipes = getAllRecipeByRecipeBookIds(recipeBookIds);
      console.log("recipes: " + recipes);
    }
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllRecipeByAdminId(), error: ",
      error
    );
  }
}

/////////// INIT USER ///////////
/**
 * Initializes the recipeBook and market for a user.
 *
 * @param userId - The id of the user.
 * @returns A Promise that resolves when the data initialization is complete.
 * @throws An error if there is an issue initializing the data.
 */
export async function action_initUser(userId: string) {
  let user = undefined;
  try {
    // Get the user
    user = (await getUserById(userId)) as User;
  } catch (error) {
    return {
      error: "Il n'existe pas de compte lié à cet utilisateur.",
      status: 400,
    };
  }
  try {
    if (!user) {
      return {
        error: "Il n'existe pas de compte lié à cet utilisateur.",
        status: 400,
      };
    }
    const recipeBook = {
      name: "Default_" + user.name,
      userId: user.id,
    };

    let supplier = {
      name: "Market_" + user.name,
      userId: user.id,
      description: "Default market",
    };
    // create supplier
    await createSupplier(supplier as Supplier);
    // create recipeBook
    await createRecipeBook(recipeBook as RecipeBook);
    const supplierSupported: SupplierSupported[] =
      await getAllSupplierSupported();

    let supplierToAdd: Supplier[] = [];
    let contactToAdd: Contact[] = [];

    supplierSupported.map((supplier) => {
      if (supplier.isPublic) {
        supplierToAdd.push({
          name: supplier.name,
          prompt: supplier.prompt,
          description: supplier.description,
          userId: userId,
        } as Supplier);

        contactToAdd.push({
          userId: userId,
          name: supplier.name,
          description: supplier.description,
          phoneNumber: supplier.phoneNumber,
        } as Contact);
      }
    });
    // Create all supplier based on supplierSupported
    await createManySupplier(supplierToAdd);
    // Create all Contact based on supplierSupported
    await createManyContact(contactToAdd);
  } catch (error) {
    return {
      error: "Une erreur interne est survenu.",
      status: 500,
    };
  }
  return {
    success: "Les contacts et les fournisseurs sont initalisé correctement.",
    status: 200,
  };
}

// REMOVE USER
export async function action_removeDataUser(userId: string) {
  try {
    const user = await getUserById(userId);

    if (user) {
      // Remove recipe book
      await deleteRecipeBookByUserIdAndName(userId, "Default_" + user.name);
      // Remove all Supplier
      await deleteAllSupplierByUserId(userId);
      await deleteAllContact(userId);
    }
  } catch (error) {
    console.error(
      "Error data-access/action: action_removeUser(), error: ",
      error
    );
  }
}

export async function action_initSupplierSupported() {}
