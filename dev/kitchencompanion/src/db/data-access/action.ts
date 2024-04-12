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
import { getAllRecipeByRecipeBookIds } from "@/db/data-access/recipe";

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
