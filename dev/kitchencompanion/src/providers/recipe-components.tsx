"use client";

import { RecipeComponents } from "@/contexts/recipe-components";
import { Component } from "@/lib/composite/component";

export function SessionProvider({
  children,
  ingredients,
}: {
  children: React.ReactNode;
  ingredients: Component[];
}) {
  return (
    <RecipeComponents.Provider value={ingredients}>
      {children}
    </RecipeComponents.Provider>
  );
}
