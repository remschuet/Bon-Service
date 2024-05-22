"use client";

import { useViewRecipe } from "@/hooks/useViewRecipe";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { RecipeHeader } from "@/app/[locale]/(protected)/recipes/[recipeBook]/[recipeId]/_components/recipe-header";
import { RecipeCard } from "@/app/[locale]/(protected)/recipes/[recipeBook]/[recipeId]/_components/recipe-card";
import { RecipeIngredients } from "@/app/[locale]/(protected)/recipes/[recipeBook]/[recipeId]/_components/recipes-ingredients";
import { RecipeSteps } from "@/app/[locale]/(protected)/recipes/[recipeBook]/[recipeId]/_components/recipe-steps";
import { RecipeExport } from "./_components/recipe-export";

export default function ViewRecipe() {
  const recipeId = useSearchParams().get("recipeId") as string;
  const [multiplier, setMultiplier] = useState<number>(1);
  const { recipe, ingredients } = useViewRecipe(recipeId);

  if (!ingredients || !recipe) {
    return (
      <div className='container mx-auto space-y-10 '>
        <PulseLoader
          color='#d6d3d1'
          size={50}
        />
      </div>
    );
  }

  const steps: string[] = JSON.parse(recipe.steps);

  return (
    <div className='container mx-auto space-y-2'>
      <RecipeCard recipeName={recipe.name}>
        <RecipeHeader
          recipe={recipe}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
        />
        <RecipeIngredients
          ingredients={ingredients}
          multiplier={multiplier}
        />
        <RecipeSteps recipeSteps={steps} />
      </RecipeCard>
      <RecipeExport />
    </div>
  );
}
