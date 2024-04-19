"use client";

import { RecipeGeneral } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-general";
import { RecipeIngredientInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-ingredient-input";
import { RecipeStepsInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-steps-input";
import { RecipeComponent } from "@/lib/composite/recipe";

export const RecipeBuilder = ({
  ingredients,
}: {
  ingredients: RecipeComponent[];
}) => {
  return (
    <div className='space-y-2 flex gap-4 justify-center mt-10'>
      <RecipeGeneral />
      <div className='space-y-2'>
        <RecipeIngredientInput
          onRemoveIngredient={() => {}}
          setIngredientComponents={() => {}}
        />
        <RecipeStepsInput />
      </div>
    </div>
  );
};
