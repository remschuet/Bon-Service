"use server";

import {
  createKitchen,
  deleteKitchen,
  deleteKitchenByUserAndName,
  getKitchenByAdminAndName,
} from "@/data-access/kitchen";
import {
  createRecipeBook,
  deleteRecipeBookByUserIdAndName,
} from "@/data-access/recipe";
import {
  createSupplier,
  getSupplier,
  linkSupplierKitchen,
  removeSupplier,
  removelinkSupplierKitchen,
} from "@/data-access/supplier";
import {
  getKitchensByAdmin,
  getKitchensByAdminById,
  getUserById,
} from "@/data-access/user";
import { Kitchen } from "@prisma/client";
import { Supplier, RecipeBook, User } from "@prisma/client";

/*LORSQUE ON CRER UN USER PAS SEULEMENT UNE CUISINE*/
export async function actionCreateKitchenWhenUserCreate(userId: string) {
  console.log("testing");

  const user = (await getUserById(userId)) as User;

  if (user) {
    const kitchen = {
      name: "Kitchen_" + user.name,
      userId: userId,
    };
    await createKitchen(kitchen as Kitchen);
    // create kitchen
    // create default recipe book
    const recipeBook = {
      name: "Default_" + user.name,
      userId: kitchen.userId,
    };
    const newKitchen = await getKitchenByAdminAndName(
      user.id,
      "Kitchen_" + user.name
    );
    await createRecipeBook(recipeBook as RecipeBook);
    // create supplier marché
    let supplier = {
      name: "Market_" + user.name,
    };
    await createSupplier(supplier as Supplier);
    const newSupplier = await getSupplier(supplier.name);
    // link supplier to user
    if (newSupplier && newKitchen) {
      await linkSupplierKitchen(newSupplier.id, newKitchen.id);
    } else {
      console.log("error");
      console.log(newSupplier);
      console.log(newKitchen);
    }
  }
}

export async function actionDestroyKitchenAndMore(userId: string) {
  const user = await getUserById(userId);
  if (user) {
    const kitchen = await getKitchenByAdminAndName(
      userId,
      "Kitchen_" + user.name
    );
    const supplierObj = {
      name: "Market_" + user.name,
    };
    const supplier = await getSupplier(supplierObj.name);

    if (kitchen && supplier) {
      // Remove link
      await removelinkSupplierKitchen(supplier.id, kitchen.id);
      // Remove recipe book
      await deleteRecipeBookByUserIdAndName(userId, "Default_" + user.name);
    }
    // Remove kitchen
    await deleteKitchenByUserAndName(user.id, "Kitchen_" + user.name);
    // Remove supplier
    await removeSupplier(supplier as Supplier);
  }
}
