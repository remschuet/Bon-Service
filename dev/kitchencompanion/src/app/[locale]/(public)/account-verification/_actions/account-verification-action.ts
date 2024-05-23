"use server";

import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/db/data-access/verification-token";
import { getUser, userVerification } from "@/db/data-access/user";
import { accountInit } from "@/app/[locale]/(public)/account-verification/_actions/account-init-action";

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

  const resultInit = await accountInit(user.id);

  if (resultInit.error) {
    return { error: resultInit.error, status: 400 };
  }

  return { success: "Votre courriel a été vérifié avec succès.", status: 200 };
}
