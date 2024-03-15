"use server";

import { createKitchen } from "@/data-access/kitchen";
import { Kitchen } from "@prisma/client";

export async function actionCreateKitchen(kitchen: Kitchen) {
  await createKitchen(kitchen);
}
