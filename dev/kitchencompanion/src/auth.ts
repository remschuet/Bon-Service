import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prisma_db";
import { getUserById } from "@/data_access/user";
import { UserTypes } from "@prisma/client";

type ExtendedSession = DefaultSession["user"] & {
    userType: UserTypes;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedSession;
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.userType = existingUser.userType;

            return token;
        },
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user && token.userType) {
                session.user.userType = token.userType as UserTypes;
            }

            console.log("sessionToken:", token);
            console.log("session:", session);
            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
