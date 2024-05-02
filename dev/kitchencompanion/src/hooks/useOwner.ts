import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getRecipeBookById } from "@/db/data-access/recipe-book";

export function useOwner(recipeBookId: string) {
  const { id } = useSession();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const recipeBook = await getRecipeBookById(recipeBookId);

        if (!recipeBook) {
          return;
        }

        setIsOwner(recipeBook.userId === id);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOwner();
  }, []);

  return { isOwner };
}
