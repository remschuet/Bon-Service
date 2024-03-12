/**
 * @description Public routes
 * @type {string[]}
 *
 * This is a list of public routes that are accessible to everyone.
 */

export const publicRoutes = ["/", "/privacy", "/terms", "/test", "/test/kitchen", "/test/supplier"];

/**
 * @description Authentication routes
 * @type {string[]}
 *
 * This is a list of routes that are used for authentication.
 * Will be used to redirect users to the dashboard if they are already authenticated.
 */

export const authRoutes = ["/login", "/register"];

/**
 * @description Protected routes
 * @type {string[]}
 *
 * This is a list of protected routes that are only accessible to authenticated users.
 */

export const apiRoutesPrefix = "/api/auth";
export const DEFAULT_REDIRECT_URL = "/dashboard";
