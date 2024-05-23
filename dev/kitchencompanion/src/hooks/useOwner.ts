import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getRecipeBookOwner } from "./_action/action";

export function useOwner(recipeBookId: string) {
  const { id } = useSession();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwner() {
      try {
        setLoading(true);
        const recipeBook = await getRecipeBookOwner(recipeBookId);

        if (!recipeBook) {
          return;
        }

        setIsOwner(recipeBook.userId === id);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOwner();
  }, []);

  return { isOwner, loading };
}
