import { useContext, useEffect } from "react";
import { IngredientsContext } from "@/contexts/ingredients";
import { Ingredient } from "@prisma/client";

export function useIngredients(): {
  ingredients: Ingredient[];
  refetch: () => void;
} {
  const { ingredients, refetch } = useContext(IngredientsContext);

  useEffect(() => {
    if (ingredients.length === 0) {
      refetch();
    }
  }, [ingredients, refetch]);

  return { ingredients, refetch };
}
