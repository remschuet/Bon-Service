import { Component } from "@/lib/composite/component";
import { Recipe } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { createContext } from "react";

export const NewRecipe = createContext({
  isComplete: false,
  newRecipe: new Recipe(),
  name: "",
  setName(value: string) {},
  cost: 0,
  setCost(value: number) {},
  recipeYield: 0,
  setRecipeYield(value: number) {},
  unit: undefined as Unit | undefined,
  setUnit(value: Unit) {},
  description: "",
  setDescription(value: string) {},
  category: "",
  setCategory(value: string) {},
  recipeType: undefined as RecipeState | undefined,
  setRecipeType(value: RecipeState) {},
  prepTime: 0,
  setPrepTime(value: number) {},
  cookTime: 0,
  setCookTime(value: number) {},
  steps: "",
  setSteps(value: string) {},
  version: "1.0.0",
  setVersion(value: string) {},
  ingredients: [] as Component[],
  setIngredients(value: Component[]) {},
});
