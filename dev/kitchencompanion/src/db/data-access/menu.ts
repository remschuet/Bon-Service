import { Menu, MenuKitchen, MenuRecipe, Recipe } from "@prisma/client";
import { db } from "@/db/prisma-db";

/***** TABLES ****** 
* Menu
* MenuRecipe
* MenuKitchen
* DishsType
*/

/*******************************/
/********* TABLE MENU **********/
/*******************************/
/**
 * Creates a new menu in the database.
 * 
 * @param menu - The menu object to be created.
 * @returns A promise that resolves to the created menu object.
 */

export async function createMenu(menu: Menu, menuRecipe: MenuRecipe, recipe: Recipe[]) {
  try {
    return await db.$transaction([

    db.menu.create({
      data: {
        name: menu.name,
        userId: menu.userId,
        description: menu.description,
        cost: menu.cost,
      },
    }),
    
    ...recipe.map((recipe) => {
    return db.menuRecipe.create({
      data: {
        menuId: menu.id,
        recipeId: recipe.id,
        type: menuRecipe.type,
        order: menuRecipe.order,
      },
    });
  }),

  ]);
  } catch (error) {
    console.error("Error data-access/menu: createMenu(), error: ", error);
    throw error;
  }
}

/**
 * Get a specific menu.
 *
 * @param userId - The id of the user who created the menu.
 * @param name - The name of the menu to be retrieved.
 * @returns A promise that resolves to the found menu object, or null if no menu is found.
 */
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
 * Updates a specific menu.
 *
 * @param menuId - The id of the menu to be updated.
 * @param menu - The updated menu object containing the new name, description, and cost.
 * @returns A promise that resolves to the updated menu object, or null if no menu is found.
 */
export async function updateMenu(menuId: string, menu: Menu) {
  try {
    return await db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        name: menu.name,
        description: menu.description,
        cost: menu.cost,
      },
    });
  } catch (error) {
    console.error("Error data-access/menu: updateMenu(), error: ", error);
    throw error;
  }
}


/**
 * Deletes a specific menu.
 *
 * @param userId - The id of the user who created the menu.
 * @param name - The name of the menu to be deleted.
 * @returns A promise that resolves to the deleted menu object, or null if no menu is found.
 */
export async function deleteMenu(userId: string, name: string) {
  try {
    return await db.menu.delete({
      where: {
        userId: userId,
        name: name,
      },
    });
  } catch (error) {
    console.error("Error data-access/menu: deleteMenu(), error: ", error);
    throw error;
  }
}

/*******************************/
/***** TABLE MENU-KITCHEN ******/
/*******************************/


/**
 * link menu to kitchen.
 * @param kitchenId - The kitchen id.
 * @param menuId - The menu id
 * @returns A promise that resolves to the link MenuKitchen.
 */
export async function linkMenuToKitchen(menuId: string, kitchenId: string) {
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


/**
 * Get all the menus links in kitchen.
 *
 * @param kitchenId - The id of the kitchen to get the links for.
 * @returns A promise that resolves to an array of links between the specified kitchen and menus, or an empty array if no links are found.
 */
export async function getLinkMenuToKitchen(kitchenId: string){
  try {
    return await db.menuKitchen.findMany({
      where: {
        kitchenId: kitchenId,
      },
      include: {
        menu: true,
      }
    });
  } catch (error) {
    console.error(
      "Error data-access/menu: getLinkMenuToKitchen(), error: ",
      error
    );
  }
}

/**
 * Delete the link (public) between a specific menu and kitchen.
 *
 * @param menuId - The id of the menu to be unlinked from the kitchen.
 * @param kitchenId - The id of the kitchen to be unlinked from the menu.
 * @returns A promise that resolves to the deleted link between the menu and kitchen, or null if no link is found.
 */
export async function deleteLinkMenuKitchen(menuId: string, kitchenId: string){
  try {
    return await db.menuKitchen.deleteMany({
      where: {
        menuId: menuId,
        kitchenId: kitchenId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/menu: deleteLinkMenuKitchen(), error: ",
      error
    );
    throw error;
  }
}


/*******************************/
/***** TABLE MENU-RECIPES ******/
/*******************************/


export async function create(){
  
}
