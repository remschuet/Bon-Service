import { Recipe } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllRecipeByBooksId } from "@/hooks/_action/action";

export function useRecipes(recipeBookId: string): {
  recipes: Recipe[];
} {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipeByBooksId(recipeBookId);
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes };
}
