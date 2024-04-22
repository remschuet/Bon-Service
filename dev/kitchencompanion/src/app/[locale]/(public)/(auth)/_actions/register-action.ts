"use server";

import { createUser, getUser } from "@/db/data-access/user";
import { sendVerificationEmail } from "@/lib/auth/mail";
import { createVerificationToken } from "@/lib/auth/tokens";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Registers a new user.
 *
 * @param user - The user object containing the user details.
 * @returns An object with the registration status.
 *          - If the registration is successful, it returns an object with a success message and a status code of 200.
 *          - If the registration fails due to an existing email address, it returns an object with an error message and a status code of 500.
 */

export async function register(user: User) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await createUser(user);

    const verificationToken = await createVerificationToken(user.email);
    const res = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    if (res.error) {
      return { error: "Une erreur est survenue", status: 500 };
    }

    return {
      success: "Votre compte a été créé avec succès.",
      status: 200,
    };
  } catch (e: any) {
    // If the insertion returns an error, it means the email address is already in use
    // Return a relevant message for the user
    return {
      error:
        "Il existe déjà un compte pour cette addresse courriel. Veuillez recommencer.",
      status: 500,
    };
  }
}

/**
 * Checks if a user with the given email address exists.
 *
 * @param email - The email address to check.
 * @returns A boolean indicating whether a user with the given email address exists.
 */

export async function userExist(email: string) {
  const user = await getUser(email);
  return !!user;
}
