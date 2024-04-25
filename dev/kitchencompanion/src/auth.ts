import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prisma-db";
import { getUserById } from "@/db/data-access/user";
import { UserTypes } from "@prisma/client";

// Type sur mesure pour ajouter des propriétés à l'objet user de la session

type ExtendedUser = DefaultSession["user"] & {
  id: string;
  userType: UserTypes;
  isPremium: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string);

      // Si l'utilisateur n'a pas vérifier son adresse courriel, on ne le connecte pas
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.userType = existingUser.userType;
      token.isPremium = existingUser.isPremium;

      return token;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.userType) {
        session.user.userType = token.userType as UserTypes;
      }

      if (session.user) {
        session.user.isPremium = token.isPremium as boolean;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
