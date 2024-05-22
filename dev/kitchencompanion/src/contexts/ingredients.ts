import { createContext } from "react";
import { Ingredient } from "@prisma/client";

interface IngredientsContextType {
  ingredients: Ingredient[];
  refetch: () => void;
}

const defaultContextValue: IngredientsContextType = {
  ingredients: [],
  refetch: () => {},
};

export const IngredientsContext =
  createContext<IngredientsContextType>(defaultContextValue);
