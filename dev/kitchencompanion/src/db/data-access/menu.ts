import { Menu, MenuKitchen } from "@prisma/client";
import { db } from "@/db/prisma-db";

export async function createMenu(menu: Menu) {
  try {
    return await db.menu.create({
      data: {
        name: menu.name,
        userId: menu.userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMenu(userId: string, name: string) {
  try {
    return await db.menu.findFirst({
      where: {
        userId: userId,
        name: name,
      },
    });
  } catch (error) {
    console.error("Error data-access/menu: getMenu(), error: ", error);
    throw error;
  }
}

/**
 * link menu to kitchen.
 * @param kitchenId - The kitchen id.
 * @param menuId - The menu id
 * @returns A promise that resolves to the link MenuKitchen.
 */
export async function linkMenuToKitchen(kitchenId: string, menuId: string) {
  try {
    return await db.menuKitchen.create({
      data: {
        kitchenId: kitchenId,
        menuId: menuId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/menu: linkMenuToKitchen(), error: ",
      error
    );
  }
}
