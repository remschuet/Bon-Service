"use server";

import { z } from "zod";
import { LoginSchema } from "@/validation/schema";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_URL } from "@/route";
import { AuthError } from "next-auth";

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedValues = LoginSchema.safeParse(values);

    if (!validatedValues.success) {
        return { error: "Valeurs invalides", status: 400 };
    }

    const { email, password } = validatedValues.data;

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
