import { RecipeBook } from "@prisma/client";
import { useContext, useEffect } from "react";
import { RecipeBookContext } from "@/contexts/recipe-books";

export function useRecipeBooks(): {
  recipeBooks: RecipeBook[];
  refetch: () => void;
} {
  const { recipeBooks, refetch } = useContext(RecipeBookContext);

  useEffect(() => {
    if (recipeBooks.length === 0) {
      refetch();
    }
  }, [recipeBooks, refetch]);

  return { recipeBooks, refetch };
}
