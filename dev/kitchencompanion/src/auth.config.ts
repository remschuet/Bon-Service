import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/validation/schema";
import { getUser } from "@/data-access/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const validatedValues = LoginSchema.safeParse(credentials);

        if (validatedValues.success) {
          const { email, password } = validatedValues.data;

          const user = await getUser(email);
          if (!user || !user.password) return null;

          const validPassword = await bcrypt.compare(password, user.password);

          if (validPassword) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
