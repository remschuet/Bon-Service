import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prisma_db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
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
