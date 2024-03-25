"use server";

import { z } from "zod";
import { PasswordResetSchema } from "@/lib/validation";
import { createPasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResponseMessage } from "@/lib/type";
import { getUser } from "@/db/data-access/user";

export async function sendPasswordResetToken(
  values: z.infer<typeof PasswordResetSchema>
) {
  const validatedValues = PasswordResetSchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Courriel invalide", status: 400 };
  }

  const { email } = validatedValues.data;

  const existingUser = await getUser(email);

  if (!existingUser || !existingUser.email) {
    return {
      error: "Il n'existe pas de compte associé à cette adresse courriel",
      status: 400,
    };
  }

  const passwordResetToken = await createPasswordResetToken(email);
  const res = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return res as ResponseMessage;
}
