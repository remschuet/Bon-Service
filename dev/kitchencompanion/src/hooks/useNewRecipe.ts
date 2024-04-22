import { NewRecipe } from "@/contexts/new-recipe";
import { RecipeData } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useContext } from "react";

export const useNewRecipe = () => {
  const ctx = useContext(NewRecipe);
  const submitNewRecipe = () => {
    const newRecipeData: RecipeData = {
      cost: ctx.cost,
      yield: ctx.recipeYield,
      unit: ctx.unit as Unit,
      description: ctx.description,
      recipeBook: ctx.recipeBook,
      recipeType: ctx.recipeType as RecipeState,
      prepTime: ctx.prepTime,
      cookTime: ctx.cookTime,
      steps: JSON.stringify(ctx.steps),
      version: ctx.version,
    };
    ctx.newRecipe.name = ctx.name;
    ctx.newRecipe.recipeData = newRecipeData;

    ctx.newRecipe.removeAll();

    ctx.ingredients.forEach((ingredient) => {
      ctx.newRecipe.add(ingredient);
    });

    return ctx.newRecipe;
  };

  return { ctx, submitNewRecipe };
};
