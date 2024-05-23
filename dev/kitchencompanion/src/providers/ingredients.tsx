import { IngredientsContext } from "@/contexts/ingredients";
import { getIngredients } from "@/hooks/_action/action";
import { useSession } from "@/hooks/useSession";
import { Ingredient } from "@prisma/client";
import { ReactNode, useCallback, useState } from "react";

export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { id } = useSession();

  const fetchIngredients = useCallback(async () => {
    if (id) {
      try {
        const ingredients = await getIngredients(id);
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id]);

  return (
    <IngredientsContext.Provider
      value={{ ingredients, refetch: fetchIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};
