"use client";

import { RecipeGeneral } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-general";
import { RecipeIngredientInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-ingredient-input";
import { RecipeStepsInput } from "@/app/[locale]/(protected)/recipes/add-recipe/_components/recipe-steps-input";
import { Button } from "@/components/ui/button";
import { useNewRecipe } from "@/hooks/useNewRecipe";
import { NewRecipeProvider } from "@/providers/new-recipe";

export const RecipeBuilder = () => {
  const { ctx, submitNewRecipe } = useNewRecipe();

  return (
    <NewRecipeProvider>
      <RecipeGeneral />
      <div className="space-y-2">
        <RecipeIngredientInput
          onRemoveIngredient={() => {}}
          setIngredientComponents={() => {}}
        />
        <RecipeStepsInput />
        <Button disabled={!ctx.isComplete} onClick={submitNewRecipe}>
          Créer recette
        </Button>
      </div>
    </NewRecipeProvider>
  );
};
