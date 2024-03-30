import {
  Ingredient,
  Contact,
  SupplierSupported,
  UnitMeasure,
} from "@prisma/client";
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
import { getKitchenByAdminAndName, linkKitchenUserById } from "./kitchen";

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
export async function action_initUser(userId: string) {
  try {
    const user = (await getUserById(userId)) as User;

    if (user) {
      const recipeBook = {
        name: "Default_" + user.name,
        userId: user.id,
      };

      let supplier = {
        name: "Market_" + user.name,
        userId: user.id,
        description: "default market",
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
    }
  } catch (error) {
    console.error(
      "Error data-access/action: action_initUser(), error: ",
      error
    );
  }
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

//// CONTACT ////

/**
 * Creates a new contact and links it to the specified kitchens.
 * @param contact - the contact information to create
 * @param kitchenNames - the names of the kitchens to link the contact to
 */
export async function action_CreateContact(
  contact: Contact,
  kitchenNames: string[]
) {
  let kitchenIds: string[] = [];
  // Create contact
  const newContact = await createContact(contact);
  if (!newContact) {
    return; // raise error
  }

  // build kitchenId array from name
  for (let i = 0; i < kitchenNames.length; i++) {
    let kitchen = await getKitchenByAdminAndName(
      contact.userId,
      kitchenNames[i]
    );
    if (kitchen === null || kitchen === undefined) {
      return; // raise error
    }

    kitchenIds.push(kitchen.id);
  }
  // Adding link
  for (let i = 0; i < kitchenIds.length; i++) {
    linkContactKitchen(newContact.id, kitchenIds[i]);
  }
}
export async function action_DeleteContactPublicForKitchen() {}
export async function action_GetContactPublicForKitchenByUser(userId: string) {}
export async function action_GetContactPublicForKitchenByKitchenId(
  kitchenId: string
) {}
