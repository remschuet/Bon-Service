import { Kitchen, KitchenUser } from "@prisma/client";
import { db } from "@/db/prisma_db";

////////////////////////////////
// TABLES 
// Kitchen
// KitchenUser
////////////////////////////////

export async function createKitchen(kitchen: Kitchen) {
  return await db.kitchen.create({
    data: {
      userId: kitchen.userId,
      name: kitchen.name 
    },
  });
}

export async function deleteKitchen(kitchen: Kitchen) {
    return await db.kitchen.delete({
      where: { id: kitchen.id },
    });
}

export async function getUserForKitchen(kitchen: Kitchen) {
  // KitchenUser
  return await db.kitchen.findMany({
    where: { id: kitchen.id },
    include: {
      user: true,
    },
  });
}

export async function linkKitchenUserById(userId: string, kitchenId: string) {
  // KitchenUser
  return await db.kitchenUser.create({
    data: {
      userId: userId,
      kitchenId: kitchenId,
    },
  });
}