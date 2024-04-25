"use server";

import {
  createKitchen,
  getAllKitchenUserById,
  getKitchenByAdminAndName,
  linkKitchenUserById,
} from "@/db/data-access/kitchen";
import { createUser, getUser } from "@/db/data-access/user";
import { Kitchen, User } from "@prisma/client";

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


// voir membre
export async function getContactForKitchen() {}

/**
 * Get all contacts for a specific kitchen.
 *
 * @param kitchenId - The unique identifier of the kitchen.
 * @returns - An array of User objects representing the kitchen's contacts or an error
 */
export async function getMembersForKitchen(kitchenId: string) {
  try {
    const userList = getAllKitchenUserById(kitchenId);
    // PAS ENCORE TESTÉ
    return userList;
  } catch (error) {
    return {
      error:
        "Une erreur interne est survenue, impossible de de récupérer les membres.",
      status: 500,
    };
  }
}
