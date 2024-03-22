"use server";
import { action_initUser, action_dataUser } from "@/db/data-access/action";
import { createKitchen } from "@/db/data-access/kitchen";
import {
  dev_createManySupplierSupported,
  dev_removeAllSupplierSupported,
} from "@/db/data-access/supplier";
import { Kitchen, Prisma, SupplierSupported } from "@prisma/client";

export async function actionCreateKitchenWhenUserCreate(userId: string) {
  action_initUser(userId);
}

export async function actionDestroyKitchenAndMore(userId: string) {
  action_dataUser(userId);
}

export async function actionCreateKitchen(kitchen: Kitchen) {
  createKitchen(kitchen);
}

export async function actionRemoveSupplierSupported() {
  dev_removeAllSupplierSupported();
}

export async function actionCreateSupplierSupported() {
  let supplierSupportedList: SupplierSupported[] = [];

  const Hector = {
    name: "Hector Larivée",
    prompt: "OPEN IA",
    phoneNumber: "111-111-1111",
    description: "Supper fournisseur 10/10",
    isPublic: true,
  } as SupplierSupported;

  const JulienDev = {
    name: "Julien Dev",
    prompt: "OPEN IA",
    phoneNumber: "111-111-1111",
    description: "Supper fournisseur 10/10",
    isPublic: false,
  } as SupplierSupported;

  supplierSupportedList.push(Hector);
  supplierSupportedList.push(JulienDev);

  dev_createManySupplierSupported(supplierSupportedList);
}
