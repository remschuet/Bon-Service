"use server";

import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/data-access/verification-token";
import { getUser, updateUserPassword } from "@/data-access/user";
import bcrypt from "bcryptjs";

export async function passwordReset(token: string, password: string) {
  const currentToken = await getPasswordResetTokenByToken(token);

  if (!currentToken) {
    return { error: "Le jeton de réinitialisation n'existe pas.", status: 400 };
  }

  const user = await getUser(currentToken.email);

  if (!user) {
    return {
      error: "Il n'existe pas de compte associé à cette adresse courriel",
      status: 400,
    };
  }

  if (new Date(currentToken.expires) < new Date()) {
    return { error: "Le jeton de réinitialisation a expiré.", status: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await updateUserPassword(currentToken.email, hashedPassword);
  await deletePasswordResetToken(currentToken.token);

  return { success: "Votre mot de passe à été réinitialisé.", status: 200 };
}
