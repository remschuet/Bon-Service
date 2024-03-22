import { Kitchen } from "@prisma/client";
import { db } from "@/db/prisma-db";

/**
 * Creates a new kitchen.
 * @param kitchen - The kitchen object containing the userId and name.
 * @returns A promise that resolves to the created kitchen.
 */
export async function createKitchen(kitchen: Kitchen) {
  try {
    return await db.kitchen.create({
      data: {
        userId: kitchen.userId,
        name: kitchen.name,
        costObjective: kitchen.costObjective,
      },
    });
  } catch (error) {
    console.error("Error data-access/kitchen: createKitchen(), error: ", error);
    throw error;
  }
}

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
 * Retrieves the users associated with a kitchen.
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
 * Retrieves the users associated with a kitchen by kitchen ID.
 * @param kitchenId - The ID of the kitchen for which to retrieve the users.
 * @returns A promise that resolves to an array of kitchen users.
 */
export async function getAllKitchenUserById(kitchenId: string) {
  // KitchenUser
  try {
    return await db.kitchen.findMany({
      where: { id: kitchenId },
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
