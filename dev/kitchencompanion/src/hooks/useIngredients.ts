import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { useSession } from "@/hooks/useSession";
import { getIngredients } from "@/app/[locale]/(protected)/market/_action/ingredient-action";

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await getIngredients(id);

      setIngredients(ingredients);
    };

    fetchIngredients();
  }, []);

  return { ingredients };
}
