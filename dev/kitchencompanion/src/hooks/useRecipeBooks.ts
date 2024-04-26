import { RecipeBook } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAllRecipeBooksById } from "@/hooks/_action/action";

export function useRecipeBooks(): {
  recipeBooks: RecipeBook[];
} {
  const [recipeBooks, setRecipeBooks] = useState<RecipeBook[]>([]);
  const { id } = useSession();

  useEffect(() => {
    const fetchRecipeBooks = async () => {
      try {
        const recipeBooks = await getAllRecipeBooksById(id);
        setRecipeBooks(recipeBooks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeBooks();
  }, []);

  return { recipeBooks };
}
