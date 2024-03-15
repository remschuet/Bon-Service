import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/validation/schema";
import { getUser } from "@/data-access/user";
import { getEmailIPkey, rateLimitLogin } from "@/lib/rate-limiter";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const clientIP = req.headers.get("x-forwarded-for");
        console.log(clientIP);

        const validatedValues = LoginSchema.safeParse(credentials);

        if (validatedValues.success) {
          const { email, password } = validatedValues.data;

          const user = await getUser(email);
          if (!user || !user.password) return null;

          const validPassword = await bcrypt.compare(password, user.password);

          // // Rate limit login attempts
          // const emailIPKey = getEmailIPkey(email, req.ip);
          // await rateLimit(emailIPKey);

          if (validPassword) {
            // Reset fails counter

            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
