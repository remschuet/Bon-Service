"use client";

import { NewRecipe } from "@/contexts/new-recipe";
import { Component } from "@/lib/composite/component";
import { Recipe, RecipeData } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useEffect, useState } from "react";

export function NewRecipeProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [recipeYield, setRecipeYield] = useState(0);
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeState | undefined>(
    undefined
  );
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [steps, setSteps] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [ingredients, setIngredients] = useState<Component[]>([]);

  const newRecipe = new Recipe();

  useEffect(() => {
    if (
      name !== "" &&
      cost !== 0 &&
      recipeYield !== 0 &&
      unit &&
      description !== "" &&
      category !== "" &&
      recipeType &&
      prepTime !== 0 &&
      cookTime !== 0 &&
      steps !== ""
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [
    name,
    cost,
    recipeYield,
    unit,
    description,
    category,
    recipeType,
    prepTime,
    cookTime,
    steps,
  ]);

  useEffect(() => {
    const newRecipeData: RecipeData = {
      name,
      cost,
      yield: recipeYield,
      unit: unit as Unit,
      description,
      category,
      recipeType,
      prepTime,
      cookTime,
      steps: JSON.stringify(steps),
      version,
    };
    newRecipe.recipeData = newRecipeData;
  }, [isComplete]);

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
      }}
    >
      <div className="space-y-2 flex gap-4 justify-center mt-10">
        {children}
      </div>
    </NewRecipe.Provider>
  );
}
