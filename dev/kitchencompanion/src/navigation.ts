import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "fr"] as const;
export const localePrefix = "never"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/account-verification": {
    en: "/account-verification",
    fr: "/verification-compte",
  },
  "/login": {
    en: "/login",
    fr: "/connexion",
  },
  "/register": {
    en: "/register",
    fr: "/enregistrement",
  },
  "/forgot-password": {
    en: "/forgot-password",
    fr: "/mot-de-passe-oublie",
  },
  "/reset-password": {
    en: "/reset-password",
    fr: "/reinitialiser-mot-de-passe",
  },
  "/terms": {
    en: "/terms",
    fr: "/conditions",
  },
  "/privacy": {
    en: "/privacy",
    fr: "/confidentialite",
  },
  "/test": "/test",

  "/dashboard": {
    en: "/dashboard",
    fr: "/portail",
  },

  "/kitchen": {
    en: "/kitchen",
    fr: "/cuisines",
  },

  "/kitchen/[kitchenid]": {
    en: "/kitchen/[kitchenid]",
    fr: "/cuisines/[kitchenid]",
  },

  "/market": {
    en: "/market",
    fr: "/marche",
  },

  "/menus": "/menus",
  "/recipes": {
    en: "/recipes",
    fr: "/recettes",
  },

  "/contacts": "/contacts",
  // If locales use different paths, you can
  // specify each external path per locale.
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
