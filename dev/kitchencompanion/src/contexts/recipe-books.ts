import { createContext } from "react";
import { RecipeBook } from "@prisma/client";

interface RecipeBookContextType {
  recipeBooks: RecipeBook[];
  refetch: () => void;
}

const defaultContextValue: RecipeBookContextType = {
  recipeBooks: [],
  refetch: () => {},
};

export const RecipeBookContext =
  createContext<RecipeBookContextType>(defaultContextValue);
