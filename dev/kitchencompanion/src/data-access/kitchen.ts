import { Kitchen, KitchenUser } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Kitchen
// KitchenUser
////////////////////////////////

/** @description Create a new kitchen
 * @Table Kitchen
 */
export async function createKitchen(kitchen: Kitchen) {
  return await db.kitchen.create({
    data: {
      userId: kitchen.userId,
      name: kitchen.name,
    },
  });
}

/** @description Remove a kitchen
 * @Table Kitchen
 */
export async function deleteKitchen(kitchen: Kitchen) {
  return await db.kitchen.delete({
    where: { id: kitchen.id },
  });
}

/** @description Get all users working in a kitchen
 * @Table KitchenUser
 */
export async function getUsersForKitchen(kitchen: Kitchen) {
  // KitchenUser
  return await db.kitchen.findMany({
    where: { id: kitchen.id },
    include: {
      user: true,
    },
  });
}

/** @description Get all users working in a kitchen
 * @Table Kitchen
 */
export async function getUsersForKitchenById(kitchenId: string) {
  // KitchenUser
  return await db.kitchen.findMany({
    where: { id: kitchenId },
    include: {
      user: true,
    },
  });
}

/** @description Link kitchen and user(members) with Id
 * @Table KitchenUser
 */
export async function linkKitchenUserById(userId: string, kitchenId: string) {
  return await db.kitchenUser.create({
    data: {
      userId: userId,
      kitchenId: kitchenId,
    },
  });
}

/** @description Get all supplier liked to a kitchen
 * @Table kitchen
 */
export async function getSuppliersForKitchen(kitchenId: string) {
  return await db.kitchen.findMany({
    where: {
      id: kitchenId,
    },
    include: {
      supplierKitchens: true,
    },
  });
}
