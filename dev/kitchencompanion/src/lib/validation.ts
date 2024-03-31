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

export const PasswordResetSchema = z.object({
  email: z.string().email({ message: "Courriel invalide" }),
});

export const IngredientSchema = z.object({
  name: z.string().min(1).max(36),
  price: z.number().min(0.01),
  unit: z.union([
    z.literal("G"),
    z.literal("KG"),
    z.literal("L"),
    z.literal("ML"),
    z.literal("OZ"),
    z.literal("UN"),
    z.literal("LB"),
  ]),
  category: z.union([
    z.literal("Fruit & Légume"),
    z.literal("Viande"),
    z.literal("Poisson"),
    z.literal("Produit Laitier"),
    z.literal("Pâtisserie"),
    z.literal("Sec"),
    z.literal("Charcuterie"),
    z.literal("Congeler"),
    z.literal("Fines Herbes"),
    z.literal("Autre"),
  ]),
  origin: z.string().min(1).max(5),
  supplierName: z.string().min(1).max(36),
  userId: z.string().min(1).max(36),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const ContactSchema = z.object({
  userId: z.string().min(1).max(36),
  name: z.string().min(1).max(36),
  description: z.string().max(100),
  compteNumber: z.string().max(36),
  phoneNumber: z.string().regex(phoneRegex, "Numéro de téléphone invalide"),
});

export const KitchenSchema = z.object({
  name: z.string().min(1).max(36),
  costObjective: z.number().min(1).max(100),
  userId: z.string().min(1).max(36),
  description: z.string().min(1).max(128),
});

export const partialRegistrationSchema = RegistrationSchema.partial();
