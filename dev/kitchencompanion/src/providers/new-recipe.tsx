"use client";

import { NewRecipe } from "@/contexts/new-recipe";
import { Recipe, RecipeComponent } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useEffect, useState } from "react";

export function NewRecipeProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [recipeYield, setRecipeYield] = useState(1.0);
  const [unit, setUnit] = useState<Unit>("KG");
  const [description, setDescription] = useState("");
  const [recipeBook, setRecipeBook] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeState>("RECIPE");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [version, setVersion] = useState("1.0.0");
  const [ingredients, setIngredients] = useState<RecipeComponent[]>([]);

  const newRecipe = new Recipe();

  useEffect(() => {
    if (
      name.length > 0 &&
      description.length > 0 &&
      recipeBook.length > 0 &&
      recipeType &&
      prepTime > 0 &&
      cookTime > 0 &&
      steps.length > 0 &&
      ingredients.length > 0
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [
    name,
    description,
    recipeBook,
    recipeType,
    prepTime,
    cookTime,
    steps,
    ingredients,
    newRecipe,
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
    } else {
      setCost(0);
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
        recipeBook,
        setRecipeBook,
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
