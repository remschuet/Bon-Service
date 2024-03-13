import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "@/data-access/verification-token";
import { db } from "@/db/prisma-db";

/**
 * Creates a verification token for the given email.
 * If an existing token exists for the email, it will be deleted before creating a new one.
 * The token will be valid for 1 hour.
 * @param email - The email for which to create the verification token.
 *
 * @returns The created verification token.
 */

export async function createVerificationToken(email: string) {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
