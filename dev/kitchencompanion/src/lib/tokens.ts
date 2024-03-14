import { v4 as uuid } from "uuid";
import {
  getPasswordResetTokenByEmail,
  getVerificationTokenByEmail,
} from "@/data-access/verification-token";
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

/**
 * Creates a password reset token for the given email.
 * If an existing token exists for the email, it will be deleted before creating a new one.
 * The token will be valid for 10 minutes.
 * @param email - The email for which to create the password reset token.
 *
 * @returns The created password reset token.
 */
export async function createPasswordResetToken(email: string) {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
}
