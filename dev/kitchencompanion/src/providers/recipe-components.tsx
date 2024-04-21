"use client";

import { RecipeComponents } from "@/contexts/recipe-components";
import { Ingredient } from "@/lib/composite/ingredient";
import { Recipe } from "@/lib/composite/recipe";

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
      value={{ ingredientsJSON: ingredients, recipesJSON: recipes }}>
      {children}
    </RecipeComponents.Provider>
  );
}
