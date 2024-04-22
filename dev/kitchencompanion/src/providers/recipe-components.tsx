"use client";

import { RecipeComponents } from "@/contexts/recipe-components";

export function RecipeComponentsProvider({
  children,
  ingredients,
  recipes,
}: {
  children: React.ReactNode;
  ingredients: string;
  recipes: string;
}) {
  return (
    <RecipeComponents.Provider
      value={{ ingredientsJSON: ingredients, recipesJSON: recipes }}
    >
      {children}
    </RecipeComponents.Provider>
  );
}
