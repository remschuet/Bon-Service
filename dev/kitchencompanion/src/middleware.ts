import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    DEFAULT_REDIRECT_URL,
    apiRoutesPrefix,
    authRoutes,
    protectedRoutes,
    publicRoutes,
} from "@/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    console.log("isLoggedIn", isLoggedIn);
    console.log("ROUTE : ", nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
