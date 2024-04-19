import { NewRecipe } from "@/contexts/new-recipe";
import { useContext } from "react";

export const useNewRecipe = () => {
  const ctx = useContext(NewRecipe);
  const submitNewRecipe = () => {
    // SUBMIT RECIPE TO DATABASE
  };

  return { ctx, submitNewRecipe };
};
