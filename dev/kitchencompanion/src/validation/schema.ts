import { z } from "zod";

const RegistrationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(24)
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*[0-9].*"), "One number"),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Courriel invalide" }),
  password: z.string().min(1, { message: "Mot de passe invalide" }),
});

export const partialRegistrationSchema = RegistrationSchema.partial();
