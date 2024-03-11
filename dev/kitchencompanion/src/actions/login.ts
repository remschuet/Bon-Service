"use server";

import { z } from "zod";
import { getUser } from "@/data_access/user";
import { LoginSchema } from "@/validation/schema";
import { verify } from "argon2";

export async function login(values: z.infer<typeof LoginSchema>) {
    const user = await getUser(values.email);

    if (!user) {
        return { error: "Utilisateur non trouvé", status: 404 };
    }

    const validPassword = await verify(user.password, values.password);

    if (!validPassword) {
        return { error: "Mot de passe invalide", status: 401 };
    }

    return { user, status: 200 };
}
