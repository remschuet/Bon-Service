/**
 * @description Public routes
 * @type {string[]}
 *
 * This is a list of public routes that are accessible to everyone.
 */

export const publicRoutes = [
  "/",
  "/not-found",
  "/privacy",
  "/account-verification",
  "/verification-compte",
  "/forgot-password",
  "/mot-de-passe-oublie",
  "/terms",
];

/**
 * @description Authentication routes
 * @type {string[]}
 *
 * This is a list of routes that are used for authentication.
 * Will be used to redirect users to the dashboard if they are already authenticated.
 */

export const authRoutes = [
  "/login",
  "/connexion",
  "/register",
  "/enregistrement",
  "/password-reset",
  "/reinitialiser-mot-de-passe",
];

export const adminRoutes = ["/market", "/contacts", "/recipes", "/menus"];

export const apiRoutesPrefix = "/api/auth";
export const DEFAULT_REDIRECT_URL = "/dashboard";
