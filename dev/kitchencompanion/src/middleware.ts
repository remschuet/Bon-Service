import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import authConfig from "@/auth.config";
import {
  DEFAULT_REDIRECT_URL,
  apiRoutesPrefix,
  authRoutes,
  publicRoutes,
} from "@/route";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr"],
  defaultLocale: "fr",
  localePrefix: "never",
});

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

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    return intlMiddleware(req);
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return intlMiddleware(req);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(fr|en)/:path*",
    "/(api|trpc)(.*)",
  ],
};
