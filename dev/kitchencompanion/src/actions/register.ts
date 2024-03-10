"use server";

import { createUser, getUser } from "@/data_access/user";
import { User } from "@prisma/client";

// Permet de définir un type pour la réponse de la fonction register
export type RegisterResponse = { error?: string };

export async function register(user: User) {
  try {
    await createUser(user);
  } catch (e: any) {
    // Si l'insertion retourne une erreure, c'est que l'adresse courriel est déjà utilisée
    // On retourne donc un message pertinent pour l'utilisateur
    return {
      error:
        "Il existe déjà un compte pour cette addresse courriel. Veuillez recommencer.",
    } as RegisterResponse;
  }
}

export async function userExist(email: string) {
  const user = await getUser(email);
  return user ? true : false;
}
