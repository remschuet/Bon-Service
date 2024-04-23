"use client";

import { RecipeComponents } from "@/contexts/recipe-components";

export function RecipeComponentsProvider({
  children,
  ingredients,
  recipes,
  recipeIngredients,
}: {
  children: React.ReactNode;
  ingredients: string;
  recipes: string;
  recipeIngredients: string;
}) {
  return (
    <RecipeComponents.Provider
      value={{
        ingredientsJSON: ingredients,
        recipesJSON: recipes,
        recipeIngredientsJSON: recipeIngredients,
      }}>
      {children}
    </RecipeComponents.Provider>
  );
}
