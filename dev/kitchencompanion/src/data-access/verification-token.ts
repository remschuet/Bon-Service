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

/**
 * Retrieves the password reset token for a given email.
 * @param email - The email address associated with the password reset token.
 * @returns The password reset token, or null if not found.
 */
export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
}

/**
 * Retrieves a password reset token by its token value.
 * @param {string} token - The token value to search for.
 * @returns The password reset token, or null if not found.
 */
export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
}

/**
 * Deletes a verification token by token.
 * @param token - The token associated with the verification token.
 */

export async function deleteVerificationToken(token: string) {
  try {
    await db.verificationToken.delete({
      where: {
        token,
      },
    });
  } catch (e) {
    return null;
  }
}
