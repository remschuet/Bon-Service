"use server";

import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data-access/verification-token";
import { getUser, userVerification } from "@/data-access/user";

export async function accountVerification(token: string) {
  const currentToken = await getVerificationTokenByToken(token);

  if (!currentToken) {
    return { error: "Le jeton de vérification n'existe pas.", status: 400 };
  }

  if (new Date(currentToken.expires) < new Date()) {
    return { error: "Le jeton de vérification a expiré.", status: 400 };
  }

  const user = await getUser(currentToken.email);

  if (!user) {
    return { error: "Le courriel n'existe pas.", status: 400 };
  }

  await userVerification(user, currentToken);
  await deleteVerificationToken(currentToken.token);

  return { success: "Votre courriel a été vérifié avec succès.", status: 200 };
}
