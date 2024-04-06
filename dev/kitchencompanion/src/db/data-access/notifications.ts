import { db } from "@/db/prisma-db";
import { Notification } from "@prisma/client";

export async function createNotification(notification: Notification) {
  try {
    return await db.notification.create({
      data: {
        content: notification.content,
        type: notification.type,
        userId: notification.userId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/ingredient: createIngredient(), error: ",
      error
    );
    throw error;
  }
}

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  return await db.notification.findMany({
    where: {
      userId: userId,
    },
  });
}
