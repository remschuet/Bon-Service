import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          console.log(credentials);
          return null; // Replace void with null
        } catch (e) {
          console.log(e);
          return null; // Replace void with null
        }
      },
    }),
  ],
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
