import { RecipeComponents } from "@/contexts/recipe-components";
import { useContext } from "react";

export const useRecipeComponents = () => useContext(RecipeComponents);
