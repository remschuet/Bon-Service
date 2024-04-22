import { Recipe, RecipeComponent } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { createContext } from "react";

export const NewRecipe = createContext({
  isComplete: null as boolean | null,
  newRecipe: new Recipe(),
  name: "",
  setName(value: string) {},
  cost: 0,
  setCost(value: number) {},
  recipeYield: 1,
  setRecipeYield(value: number) {},
  unit: "KG" as Unit,
  setUnit(value: Unit) {},
  description: "",
  setDescription(value: string) {},
  recipeBook: "",
  setRecipeBook(value: string) {},
  recipeType: undefined as RecipeState | undefined,
  setRecipeType(value: RecipeState) {},
  prepTime: 0,
  setPrepTime(value: number) {},
  cookTime: 0,
  setCookTime(value: number) {},
  steps: [] as string[],
  setSteps(value: string[]) {},
  version: "1.0.0",
  setVersion(value: string) {},
  ingredients: [] as RecipeComponent[],
  setIngredients(value: RecipeComponent[]) {},
});
