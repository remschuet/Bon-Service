"use client";

import { RecipeBookContext } from "@/contexts/recipe-books";
import { getAllRecipeBooksById } from "@/hooks/_action/action";
import { useSession } from "@/hooks/useSession";
import { RecipeBook } from "@prisma/client";
import { ReactNode, useCallback, useState } from "react";

export const RecipeBooksProvider = ({ children }: { children: ReactNode }) => {
  const [recipeBooks, setRecipeBooks] = useState<RecipeBook[]>([]);
  const { id } = useSession();

  const fetchRecipeBooks = useCallback(async () => {
    if (id) {
      try {
        const recipeBooks = await getAllRecipeBooksById(id);
        setRecipeBooks(recipeBooks);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  return (
    <RecipeBookContext.Provider
      value={{ recipeBooks, refetch: fetchRecipeBooks }}>
      {children}
    </RecipeBookContext.Provider>
  );
};
