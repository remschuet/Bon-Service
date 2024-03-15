/**
 * @description Public routes
 * @type {string[]}
 *
 * This is a list of public routes that are accessible to everyone.
 */

export const publicRoutes = [
  "/",
  "/privacy",
  "/account-verification",
  "/terms",
  "/test",
  "/test/kitchen",
  "/test/supplier",
  "/test/linkKitchenUser",
  "/test/upload",
];

/**
 * @description Authentication routes
 * @type {string[]}
 *
 * This is a list of routes that are used for authentication.
 * Will be used to redirect users to the dashboard if they are already authenticated.
 */

export const authRoutes = ["/login", "/register", "/password-reset"];

export const apiRoutesPrefix = "/api/auth";
export const DEFAULT_REDIRECT_URL = "/dashboard";
