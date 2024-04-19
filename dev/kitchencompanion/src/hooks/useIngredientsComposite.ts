import { useEffect, useState } from "react";
import { Ingredient } from "@/lib/composite/ingredient";
import { useSession } from "@/hooks/useSession";
import { getIngredients } from "@/hooks/_action/action";

export function useIngredientsComposite(): {
  ingredients: Ingredient[];
} {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { id } = useSession();

  useEffect(() => {
    let isLoaded = false;

    const fetchIngredients = async () => {
      try {
        const result = await getIngredients(id);
        if (!isLoaded) {
          setIngredients([]);

          const ingredientComponent = result.map((ingredient) => {
            const ingredientData = {
              id: ingredient.id,
              name: ingredient.name,
              unit: ingredient.unit,
              price: ingredient.price,
            };
            return new Ingredient(ingredientData);
          });

          setIngredients(ingredientComponent);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();

    return () => {
      isLoaded = true;
    };
  }, [id]);

  return { ingredients };
}
