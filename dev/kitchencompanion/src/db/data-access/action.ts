import { Ingredient, UnitMeasure } from "@prisma/client";
import { db } from "@/db/prisma-db";
import {
  createSupplier,
  getSupplier,
  removeAllSupplierByUserId,
  removeSupplier,
} from "@/db/data-access/supplier";
import { getUserById } from "@/db/data-access/user";

import { Supplier, RecipeBook, User } from "@prisma/client";
import {
  createRecipeBook,
  deleteRecipeBookByUserIdAndName,
} from "@/db/data-access/recipe";

// return notif true false
// init user
// init

// INIT USER
// create supplier
// create recipe book
// Supplier default de SupplierSupported
// Supplier -> SupplierSupported
// ? create kitchen
// ? create ingredients
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
      await createSupplier(supplier as Supplier);
      await createRecipeBook(recipeBook as RecipeBook);
    }
  } catch (error) {
    console.error(
      "Error data-access/action: action_initUser(), error: ",
      error
    );
  }
}

// REMOVE USER
export async function action_removeUser(userId: string) {
  try {
    const user = await getUserById(userId);

    if (user) {
      // Remove recipe book
      await deleteRecipeBookByUserIdAndName(userId, "Default_" + user.name);
      // Remove all Supplier
      await removeAllSupplierByUserId(userId);
    }
  } catch (error) {
    console.error(
      "Error data-access/action: action_removeUser(), error: ",
      error
    );
  }
}
