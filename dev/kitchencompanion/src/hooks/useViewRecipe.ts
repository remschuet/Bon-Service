import { useEffect, useState } from "react";
import { getCurrentRecipe } from "@/hooks/_action/action";
import { CompleteRecipe, CompleteRecipeIngredients } from "@/lib/type";

export function useViewRecipe(recipeId: string) {
  const [recipe, setRecipe] = useState<CompleteRecipe | null>(null);
  const [ingredients, setIngredients] = useState<
    CompleteRecipeIngredients[] | null
  >(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { recipe, ingredients } = await getCurrentRecipe(recipeId);
        setRecipe(recipe as unknown as CompleteRecipe);
        setIngredients(ingredients as unknown as CompleteRecipeIngredients[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return { recipe, ingredients };
}
