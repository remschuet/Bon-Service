import { Kitchen } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Kitchen
////////////////////////////////

/**
 * Creates a new kitchen.
 * @param kitchen - The kitchen object.
 * @returns A promise that resolves to the created kitchen.
 */
export async function createKitchen(kitchen: Kitchen) {
  try {
    return await db.kitchen.create({
      data: {
        userId: kitchen.userId,
        name: kitchen.name,
        costObjective: kitchen.costObjective,
        description: kitchen.description,
      },
    });
  } catch (error) {
    console.error("Error data-access/kitchen: createKitchen(), error: ", error);
    throw error;
  }
}


export async function getKitchen(kitchenId: string) {
  try {
    return await db.kitchen.findFirst({
      where: {
        id: kitchenId,
      },
    });
  } catch (error) {
    console.error("Error data-access/kitchen: getKitchen(), error: ", error);
    throw error;
  }
}

/**
 * Get a kitchen by its name and user ID (admin).
 * @param userId - The ID of the user who owns the kitchen.
 * @param name - The name of the kitchen to get.
 * @returns The kitchen, if found; otherwise, null.
 */
export async function getKitchenByAdminAndName(userId: string, name: string) {
  try {
    return await db.kitchen.findFirst({
      where: {
        name,
        userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getKitchenByAdminAndName(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all the kitchens from specified user_id (admin)
 * @param userId - The ID of the user who owns the kitchen.
 * @returns An array of kitchens, or an empty array if none found.
 */
export async function getAllKitchenByAdminId(userId: string) {
  try {
    return await db.kitchen.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllKitchenByAdminId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get the owner id of a kitchen.
 * @param kitchenId - The id of the kitchen.
 * @returns The owner id of the kitchen.
 */
export async function getOwnerId(kitchenId: string){
  try {
    return await db.kitchen.findUnique({
      where: { id: kitchenId },
      select: { userId: true },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getOwnerId(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Deletes a kitchen.
 * @param kitchen - The kitchen object to be deleted.
 * @returns A promise that resolves when the kitchen is deleted.
 */
export async function deleteKitchen(kitchen: Kitchen) {
  try {
    return await db.kitchen.delete({
      where: { id: kitchen.id },
    });
  } catch (error) {
    console.error("Error data-access/kitchen: deleteKitchen(), error: ", error);
    throw error;
  }
}

/**
 * Deletes all kitchens owned by a user with a given name.
 * @param userId - The ID of the user who owns the kitchens.
 * @param name - The name of the kitchens to delete.
 * @returns A promise that resolves when the kitchens are deleted.
 */
export async function deleteKitchenByUserAndName(userId: string, name: string) {
  try {
    return await db.kitchen.deleteMany({
      where: { userId: userId, name: name },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: deleteKitchenByUserAndName(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get the users associated with a kitchen.
 * @param kitchen - The kitchen object for which to retrieve the users.
 * @returns A promise that resolves to an array of kitchen users.
 */
export async function getAllKitchenUser(kitchen: Kitchen) {
  // KitchenUser
  try {
    return await db.kitchen.findMany({
      where: { id: kitchen.id },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllKitchenUser(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get the users associated with a kitchen by kitchen ID.
 * @param kitchenId - The ID of the kitchen for which to retrieve the users.
 * @returns A promise that resolves to an array of kitchen users.
 */
export async function getAllKitchenUserById(kitchenId: string) {
  // KitchenUser
  try {
    return await db.kitchenUser.findMany({
      where: { kitchenId: kitchenId },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllKitchenUserById(), error: ",
      error
    );
    throw error;
  }
}


/**
 * Get a specific kitchen user by kitchen ID and user ID.
 *
 * @param kitchenId - The ID of the kitchen to retrieve the user for.
 * @param userId - The ID of the user to retrieve.
 * @returns A promise that resolves to the kitchen user, if found; otherwise, null.
 */
export async function getKitchenUser(kitchenId: string, userId: string) {
  try {
    return await db.kitchenUser.findFirst({
      where: { 
        kitchenId: kitchenId,
        userId: userId
      },
    });

  } catch (error) {
    console.error(
      "Error data-access/kitchen: getIfAllowed(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Get all kitchen associated with a specific user.
 * 
 * @param userId - The ID of the user to retrieve the kitchen users for.
 * @returns A promise that resolves to an array of kitchen users associated with the specified user.
 */
export async function getAllKitchenUserByUser(userId: string) {
  try {
    return await db.kitchenUser.findMany({
      where: { 
        userId: userId
      },
    });

  } catch (error) {
    console.error(
      "Error data-access/kitchen: getAllKitchenUserByUser(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Links a user to a kitchen by user ID and kitchen ID.
 * @param userId - The ID of the user to link.
 * @param kitchenId - The ID of the kitchen to link.
 * @returns A promise that resolves when the user is linked to the kitchen.
 */
export async function linkKitchenUserById(userId: string, kitchenId: string) {
  try {
    return await db.kitchenUser.create({
      data: {
        userId: userId,
        kitchenId: kitchenId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: linkKitchenUserById(), error: ",
      error
    );
    throw error;
  }
}

export async function deleteLinkKitchenUser(userId: string, kitchenId: string) {
  try {
    return await db.kitchenUser.deleteMany({
      where: {
        userId: userId,
        kitchenId: kitchenId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/kitchen: deleteLinkKitchenUser(), error: ",
      error
    );
    throw error;
  }
}
