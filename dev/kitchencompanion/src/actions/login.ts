"use server";

import { z } from "zod";
import { LoginSchema } from "@/validation/schema";

import { createVerificationToken } from "@/lib/tokens";
import { getUser } from "@/data-access/user";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/route";
import { AuthError } from "next-auth";

import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";

/**
 * Logs in a user with the provided email and password.
 *
 * @param values - The login credentials.
 * @returns An object containing the result of the login operation.
 *          - If the login is successful, it returns `{ success: string, status: number }`.
 *          - If the login credentials are invalid, it returns `{ error: string, status: number }`.
 *          - If there is no account associated with the provided email, it returns `{ error: string, status: number }`.
 *          - If the password is incorrect, it returns `{ error: string, status: number }`.
 *          - If an error occurs during the login process, it returns `{ error: string, status: number }`.
 */

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Identifiants invalides", status: 400 };
  }

  const { email, password } = validatedValues.data;

  const existingUser = await getUser(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Il n'existe pas de compte associé à cette adresse courriel",
      status: 400,
    };
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return { error: "Le mot de passe est invalide", status: 400 };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await createVerificationToken(existingUser.email);

    const res = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    if (res.error) {
      return { error: "Une erreur est survenue", status: 500 };
    }

    return {
      success: "Un nouveau lien de vérification vous a été envoyé.",
      status: 200,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Identifiants invalides", status: 400 };
        }
        default: {
          return { error: "Une erreur est survenue", status: 500 };
        }
      }
    }
    throw error;
  }
}
