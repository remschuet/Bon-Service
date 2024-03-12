import { User, Kitchen } from "@prisma/client";
import { db } from "@/db/prisma_db";

export async function createKitchen(kitchen: Kitchen) {
  return await db.kitchen.create({
    data: {
      userId: kitchen.userId,
      name: kitchen.name 
    },
  });
}

export async function getAllKitchen(user: User) {
    return await db.kitchen.findMany({
      where: { userId: user.id },
    });
}

export async function deleteKitchen(kitchen: Kitchen) {
    return await db.kitchen.delete({
      where: { id: kitchen.id },
    });
}

// DEV FONCTIONS// DEV FONCTIONS
export async function dev_getAllKitchen() {
  const users = await db.user.findMany({
    include: {
      kitchens: true
    }
  });

  return users;
}