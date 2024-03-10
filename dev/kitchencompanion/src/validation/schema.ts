import { z } from "zod";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(24)
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*[0-9].*"), "One number"),
});

export const partialRegistrationSchema = registrationSchema.partial();
