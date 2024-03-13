import { db } from "@/db/prisma-db";

/**
 * Retrieves a verification token by email.
 * @param email - The email associated with the verification token.
 * @returns The verification token object if found, otherwise null.
 */
export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
}

/**
 * Retrieves a verification token by token.
 * @param token - The token associated with the verification token.
 * @returns The verification token object if found, otherwise null.
 */
export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (e) {
    return null;
  }
}
