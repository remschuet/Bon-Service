"use server";
import { action_initUser, action_removeUser } from "@/db/data-access/action";

export async function actionCreateKitchenWhenUserCreate(userId: string) {
  action_initUser(userId);
}

export async function actionDestroyKitchenAndMore(userId: string) {
  action_removeUser(userId);
}
