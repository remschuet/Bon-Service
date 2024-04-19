"use client";

import { NewRecipe } from "@/contexts/new-recipe";
import { Component } from "@/lib/composite/component";
import { Recipe } from "@/lib/composite/recipe";
import { RecipeState, Unit } from "@prisma/client";
import { useState } from "react";

export function NewRecipeProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [recipeYield, setRecipeYield] = useState(0);
  const [unit, setUnit] = useState<Unit>("KG");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeState>("RECIPE");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [steps, setSteps] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [ingredients, setIngredients] = useState<Component[]>([]);

  const newRecipe = new Recipe();

  console.log(newRecipe);

  return (
    <NewRecipe.Provider
      value={{
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
