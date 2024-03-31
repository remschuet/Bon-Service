import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { useSession } from "@/hooks/useSession";
import { getIngredients } from "@/hooks/_action/action";

export function useIngredients(): { ingredients: Ingredient[] } {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredients = await getIngredients(id);
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients };
}
