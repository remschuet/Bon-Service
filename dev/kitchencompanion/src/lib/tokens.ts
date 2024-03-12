import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data_access/verification-token";
import { db } from "@/db/prisma_db";

export async function createVerificationToken(email: string) {
  // On génère un token unique
  const token = uuidv4();

  // Valide pour 1 heure
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // On supprime les tokens existants pour cet email si il y en a
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // On crée un nouveau token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
