"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useViewRecipe } from "@/hooks/useViewRecipe";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function ViewRecipe() {
  const recipeId = useSearchParams().get("recipeId") as string;
  const { recipe, ingredients } = useViewRecipe(recipeId);
  const multiplierRef = useRef<HTMLInputElement>(null);
  const [multiplier, setMultiplier] = useState<number>(1);

  if (!ingredients || !recipe) {
    return (
      <div className='container mx-auto space-y-10'>
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const steps: string[] = JSON.parse(recipe.steps);

  console.log(recipe, ingredients);

  return (
    <div className='container mx-auto space-y-2'>
      <fieldset className='grid gap-6 rounded-lg border p-4'>
        <legend className='ml-1 px-1 text-sm font-medium'>
          <h1 className='text-3xl font-bold'>{recipe.name}</h1>
        </legend>
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 p-2'>
          <div className='m-5 space-y-4 flex flex-col'>
            <div className='flex gap-4'>
              <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
                <p className='font-bold'>Préparation:</p>{" "}
                {recipe.preparationTime} min
              </div>
              <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
                <p className='font-bold'>Cuisson:</p> {recipe.cookingTime} min
              </div>
              <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
                <p className='font-bold'>Rendement:</p> {recipe.yield}{" "}
                {recipe.unit.toLowerCase()}
              </div>
            </div>
            <p>{recipe.description}</p>
            <div className='flex flex-col gap-2'>
              <p className='font-bold'>Livres de cuisine:</p>
              <div className='w-auto inline-flex flex-none'>
                <Badge variant='default'>{recipe.recipeBook.name}</Badge>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='font-bold'>Allergènes:</p>
              <div className='w-auto inline-flex flex-none'></div>
            </div>
            <div className='flex gap-2'>
              <Input
                ref={multiplierRef}
                type='number'
                placeholder='Multiplier la recette'
              />
              <Button
                onClick={() => {
                  if (multiplierRef.current == null) return;
                  let value = Number(multiplierRef.current.value);

                  if (isNaN(value)) return;
                  if (value == 0) value = 1;

                  setMultiplier(value);
                }}>
                Multiplier
              </Button>
            </div>
          </div>
          <div className='w-full bg-stone-300 rounded-lg p-5'>
            {" "}
            Recipe Image
          </div>
        </div>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='ml-1 px-1 text-sm font-medium'>
            <h2 className='font-bold text-xl'>Ingrédients</h2>
          </legend>
          <ul className='m-5'>
            {ingredients.map((ingredient) => (
              <li
                className='flex gap-4'
                key={ingredient.ingredientId || ingredient.recipeIngredientId}>
                <div>
                  {ingredient.quantity * multiplier}{" "}
                  {ingredient.unit.toLowerCase()}
                </div>
                <div>
                  {ingredient.ingredient?.name ||
                    ingredient.recipeIngredient?.name}
                </div>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='ml-1 px-1 text-sm font-medium'>
            <h2 className='font-bold text-xl'>Préparation</h2>
          </legend>
          <ul className='m-5'>
            {steps.map((step, index) => (
              <li
                className='flex gap-4'
                key={index}>
                <div>{index + 1}.</div>
                <div>{step}</div>
              </li>
            ))}
          </ul>
        </fieldset>
      </fieldset>
      <div className='flex gap-2 justify-end'>
        <Button
          className='w-[25%]'
          onClick={() => console.log("Recipe deleted")}>
          Exporter au format PDF
        </Button>
      </div>
    </div>
  );
}
