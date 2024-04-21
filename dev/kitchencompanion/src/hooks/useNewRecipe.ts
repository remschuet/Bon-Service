import { NewRecipe } from "@/contexts/new-recipe";
import { RecipeData } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useContext, useEffect } from "react";

export const useNewRecipe = () => {
  const ctx = useContext(NewRecipe);
  const submitNewRecipe = () => {
    const newRecipeData: RecipeData = {
      cost: ctx.cost,
      yield: ctx.recipeYield,
      unit: ctx.unit as Unit,
      description: ctx.description,
      category: ctx.category,
      recipeType: ctx.recipeType as RecipeState,
      prepTime: ctx.prepTime,
      cookTime: ctx.cookTime,
      steps: JSON.stringify(ctx.steps),
      version: ctx.version,
    };
    ctx.newRecipe.name = ctx.name;
    ctx.newRecipe.recipeData = newRecipeData;

    useEffect(() => {
      // db call
      // createRecipe(ctx.newRecipe, ctx.ingredients);
    }, []);
  };

  return { ctx, submitNewRecipe };
};
