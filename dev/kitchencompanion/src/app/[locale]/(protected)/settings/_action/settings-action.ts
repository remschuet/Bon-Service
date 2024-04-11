"use server";

import {} from "@/db/data-access/action";
import { updateUser, updateUserPremium } from "@/db/data-access/user";

import { User, UserTypes } from "@prisma/client";
import { IngredientSchema } from "@/lib/validation";

/* dans les dao il existe aussi:
 updateUserRole
 updateUserUserType*/
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

export async function updateUserFacturation(formData: FormData) {
  try {
    const isPremium = formData.get("premium") === "PREMIUM";
    updateUserPremium("userId", isPremium);
  } catch (err) {
    return {
      error: "Une erreur est survenue.",
      status: 400,
    };
  }
  return {
    success: "Votre changement de facturation c'est bien passé.",
    status: 200,
  };
}
