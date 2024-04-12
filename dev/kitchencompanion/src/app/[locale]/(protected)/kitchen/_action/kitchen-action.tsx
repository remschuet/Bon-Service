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

/*
FIXME: EN COURS DE PROGRAMMATION
A IMPLÉMENTER ET TESTER
*/

// lier un menu
export async function addMenuToKitchen(form: FormData) {}

/**
 * Creates a new user with the provided email.
 *
 * @param email - The email address of the new user.
 * @returns An object containing a success message or an error message
 */
async function createMemberUser(email: string) {
  try {
    const user = {
      email: email,
      // TODO mettre un mdp ? (si pas verifier il peut pas ce connecter?)
      password: "AAAaaa111",
    } as User;
    createUser(user);
    // TODO: envoyer un email
  } catch {
    return {
      error:
        "Une erreur interne est survenue, impossible de créer l'utilisateur.",
      status: 500,
    };
  }
  return {
    success: "L'utilisateur a été créé avec succès.",
    status: 200,
  };
}

/**
 * Adds a member to a kitchen. If the member does not already exist he will be created in the database.
 *
 * @param form - A FormData object containing the email and userId of the member to be added.
 * @returns An object containing an error message or a success message.
 */
export async function addMemberToKitchen(form: FormData) {
  //email et userId
  const email = form.get("email") as string;
  try {
    getUser(email);
  } catch (err) {
    createMemberUser(email);
  }
  const userId = form.get("userId") as string;
  const kitchenId = form.get("kitchenId") as string;
  try {
    await linkKitchenUserById(userId, kitchenId);
  } catch (error) {
    return {
      error:
        "Une erreur interne est survenue, impossible de d'ajouter le contact.",
      status: 500,
    };
  }
  return {
    error: "La personne à été ajouté avec succes.",
    status: 200,
  };
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
