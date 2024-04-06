"use server";

import {
  createKitchen,
  getKitchenByAdminAndName,
} from "@/db/data-access/kitchen";
import { Kitchen } from "@prisma/client";

export async function addKitchen(kitchen: Kitchen) {
  try {
    const existingKitchen = await getKitchenByAdminAndName(
      kitchen.userId,
      kitchen.name
    );

    if (existingKitchen) {
      return {
        error: "Il existe déjà une cuisine portant ce nom.",
        status: 500,
      };
    }

    await createKitchen(kitchen);

    return {
      success: "La cuisine a été créée avec succès.",
      status: 200,
    };
  } catch (error) {
    return {
      error: "Une erreur interne est survenue, impossible de créer la cuisine.",
      status: 500,
    };
  }
}
