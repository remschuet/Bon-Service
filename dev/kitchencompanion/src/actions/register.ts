"use server";

import { createUser, getUser } from "@/data_access/user";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function register(user: User) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        await createUser(user);

        // TODO: Send email verification token

        return {
            success: "Votre compte a été créé avec succès.",
            status: 200,
        };
    } catch (e: any) {
        // Si l'insertion retourne une erreure, c'est que l'adresse courriel est déjà utilisée
        // On retourne donc un message pertinent pour l'utilisateur
        return {
            error: "Il existe déjà un compte pour cette addresse courriel. Veuillez recommencer.",
            status: 500,
        };
    }
}

export async function userExist(email: string) {
    const user = await getUser(email);
    return !!user;
}
