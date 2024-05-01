"use server";

import {
  updateUserUserType,
  updateUser,
  updateUserPremium,
} from "@/db/data-access/user";

import { User, UserTypes } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";

/**
 * FIX ME, Updates the user's profile information.
 *
 * @param formData - The FormData object containing the updated user information.
 * @returns An object containing a success message or error message
 */
export async function updateProfilUser(formData: FormData) {
  try {
    let user: User;
    // await updateUser("1234", user as User);
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
  return {
    success: "Vos nouvelles données sont enregistrées.",
    status: 200,
  };
}

/**
 * Updates the user's role to admin.
 *
 * @param userId - The unique identifier of the user to update.
 * @returns An object containing a success message or error message.
 */
export async function updateToAdmin(userId: string) {
  try {
    await updateUserUserType(userId);
  } catch (err) {
    return {
      error: "Une érreur est survenu.",
      status: 400,
    };
  }
  return {
    success: "Bienvenu du coté chef.",
    status: 200,
  };
}

/**
 * Updates the user's facturation information. Send email notification
 *
 * @param formData - The FormData object containing the updated user's facturation information.
 * @returns An object containing a success message or error message.
 */
export async function updateUserFacturation(formData: FormData) {
  let isPremium;
  try {
    // Get the boolean value of the facturation field
    isPremium = formData.get("facturation") === "PREMIUM";
    const id = formData.get("userId");
    // update to the new value
    updateUserPremium(id as string, isPremium);
  } catch (err) {
    return {
      error: "Une erreur est survenue.",
      status: 400,
    };
  }
  if (isPremium) {
    // send Email Notification with the new tarification
    return {
      success: "Bienvenu dans Bon Service Pro.",
      status: 200,
    };
  }
  return {
    success: "Votre changement de facturation c'est bien passé.",
    status: 200,
  };
}
