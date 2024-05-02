import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getRecipeBookOwner } from "./_action/action";

export function useOwner(recipeBookId: string) {
  const { id } = useSession();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const recipeBook = await getRecipeBookOwner(recipeBookId);

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
