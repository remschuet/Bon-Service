"use client";

import { RecipeGeneral } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-general";
import { RecipeIngredientInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-ingredient-input";
import { RecipeStepsInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-steps-input";
import { NewRecipeProvider } from "@/providers/new-recipe";

export const RecipeBuilder = () => {
  return (
    <NewRecipeProvider>
      <RecipeGeneral />
      <div className='space-y-2'>
        <RecipeIngredientInput />
        <RecipeStepsInput />
      </div>
    </NewRecipeProvider>
  );
};
