"use server";

import {
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/db/data-access/verification-token";
import { getUser, userVerification } from "@/db/data-access/user";
import { account_init } from "@/app/[locale]/(public)/account-verification/_actions/account-init";

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

  // TODO: enlever le console.log gerer le retour  
  console.log(await account_init(user.id));

  return { success: "Votre courriel a été vérifié avec succès.", status: 200 };
}
