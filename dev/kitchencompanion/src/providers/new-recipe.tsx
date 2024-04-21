"use client";

import { NewRecipe, Steps } from "@/contexts/new-recipe";
import { Recipe, RecipeComponent } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useEffect, useState } from "react";

export function NewRecipeProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [recipeYield, setRecipeYield] = useState(0.0);
  const [unit, setUnit] = useState<Unit>("KG");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeState | undefined>(
    undefined
  );
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [version, setVersion] = useState("1.0.0");
  const [ingredients, setIngredients] = useState<RecipeComponent[]>([]);

  const newRecipe = new Recipe();

  useEffect(() => {
    if (
      name.length > 0 &&
      recipeYield > 0 &&
      unit &&
      description.length > 0 &&
      category.length > 0 &&
      recipeType &&
      prepTime > 0 &&
      cookTime > 0 &&
      steps.length > 0
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [
    name,
    recipeYield,
    unit,
    description,
    category,
    recipeType,
    prepTime,
    cookTime,
    steps,
    version,
  ]);

  useEffect(() => {
    newRecipe.removeAll();

    ingredients.forEach((ingredient) => {
      newRecipe.add(ingredient);
    });

    if (ingredients.length > 0) {
      newRecipe.recipeData.yield = recipeYield;
      newRecipe.recipeData.unit = unit;

      const currCost = newRecipe.calculateCost();
      setCost(currCost);
    }
  }, [ingredients, recipeYield, unit]);

  return (
    <NewRecipe.Provider
      value={{
        isComplete,
        newRecipe,
        name,
        setName,
        cost,
        setCost,
        recipeYield,
        setRecipeYield,
        unit,
        setUnit,
        description,
        setDescription,
        category,
        setCategory,
        recipeType,
        setRecipeType,
        prepTime,
        setPrepTime,
        cookTime,
        setCookTime,
        steps,
        setSteps,
        version,
        setVersion,
        ingredients,
        setIngredients,
      }}>
      <div className='space-y-2 flex gap-4 justify-center mt-10'>
        {children}
      </div>
    </NewRecipe.Provider>
  );
}
