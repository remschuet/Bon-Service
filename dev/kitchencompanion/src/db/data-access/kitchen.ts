import { Kitchen } from "@prisma/client";
import { db } from "@/db/prisma-db";

/**
 * Creates a new kitchen.
 * @param kitchen - The kitchen object containing the userId and name.
 * @returns A promise that resolves to the created kitchen.
 */
export async function createKitchen(kitchen: Kitchen) {
  return await db.kitchen.create({
    data: {
      userId: kitchen.userId,
      name: kitchen.name,
      costObjective: kitchen.costObjective,
    },
  });
}

export async function getKitchenByAdminAndName(userId: string, name: string) {
  return await db.kitchen.findFirst({
    where: {
      name,
      userId,
    },
  });
}

/**
 * Deletes a kitchen.
 * @param kitchen - The kitchen object to be deleted.
 * @returns A promise that resolves when the kitchen is deleted.
 */
export async function deleteKitchen(kitchen: Kitchen) {
  return await db.kitchen.delete({
    where: { id: kitchen.id },
  });
}

export async function deleteKitchenByUserAndName(userId: string, name: string) {
  return await db.kitchen.deleteMany({
    where: { userId: userId, name: name },
  });
}

/**
 * Retrieves the users associated with a kitchen.
 * @param kitchen - The kitchen object for which to retrieve the users.
 * @returns A promise that resolves to an array of kitchen users.
 */
export async function getAllKitchenUser(kitchen: Kitchen) {
  // KitchenUser
  return await db.kitchen.findMany({
    where: { id: kitchen.id },
    include: {
      user: true,
    },
  });
}

/**
 * Retrieves the users associated with a kitchen by kitchen ID.
 * @param kitchenId - The ID of the kitchen for which to retrieve the users.
 * @returns A promise that resolves to an array of kitchen users.
 */
export async function getAllKitchenUserById(kitchenId: string) {
  // KitchenUser
  return await db.kitchen.findMany({
    where: { id: kitchenId },
    include: {
      user: true,
    },
  });
}

/**
 * Links a user to a kitchen by user ID and kitchen ID.
 * @param userId - The ID of the user to link.
 * @param kitchenId - The ID of the kitchen to link.
 * @returns A promise that resolves when the user is linked to the kitchen.
 */
export async function linkKitchenUserById(userId: string, kitchenId: string) {
  return await db.kitchenUser.create({
    data: {
      userId: userId,
      kitchenId: kitchenId,
    },
  });
}
