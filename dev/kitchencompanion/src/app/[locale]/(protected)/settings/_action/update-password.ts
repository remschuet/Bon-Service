"use server";

import { updateUserPassword } from "@/db/data-access/user";
import bcrypt from "bcryptjs";

export async function updatePassword(formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const userId = formData.get("userId") as string;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const result = await updateUserPassword(userId, hashedPassword);

  if (!result) {
    return {
      error: "Une erreur est survenue. Veuillez réessayer.",
      status: 500,
    };
  }

  return {
    success: "Le mot de passe a été mis à jour avec succès.",
    status: 200,
  };
}
