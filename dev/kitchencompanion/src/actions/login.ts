"use server";

import { z } from "zod";
import { getUser } from "@/data_access/user";
import { LoginSchema } from "@/validation/schema";
import { verify } from "argon2";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Valeurs invalides", status: 400 };
  }

  const user = await getUser(validatedValues.data.email);

  if (!user) {
    return { error: "Utilisateur non trouvé", status: 404 };
  }

  const validPassword = await verify(
    user.password,
    validatedValues.data.password
  );

  if (!validPassword) {
    return { error: "Mot de passe invalide", status: 401 };
  }

  return { success: "Utilisateur connecté", status: 200 };
}
