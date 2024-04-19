import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getRecipes } from "@/hooks/_action/action";
import { Recipe, RecipeData } from "@/lib/composite/recipe";

export function useRecipesComposite(): { recipeComponents: Recipe[] } {
  const { id } = useSession();
  const [recipeComponents, setRecipeComponents] = useState<Recipe[]>([]);

  useEffect(() => {
    let isLoaded = false;
    async function fetchRecipes() {
      try {
        const recipes = await getRecipes(id);

        if (recipes && !isLoaded) {
          setRecipeComponents([]);
          const newRecipes = recipes.map((recipe) => {
            const recipeData: RecipeData = {
              id: recipe.id,
              name: recipe.name,
              cost: recipe.cost,
              yield: recipe.yield,
              unit: recipe.unit,
              description: recipe.description,
              category: recipe.recipeCategoryId,
              recipeType: recipe.recipeState,
              prepTime: recipe.preparationTime,
              cookTime: recipe.preparationTime,
              steps: JSON.parse(recipe.steps),
              version: recipe.versionNumber,
            };

            console.log("recipeData", recipeData);

            return new Recipe(recipeData);
          });
          setRecipeComponents(newRecipes);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }

    fetchRecipes();

    return () => {
      isLoaded = true;
    };
  }, [id]);

  return { recipeComponents };
}
