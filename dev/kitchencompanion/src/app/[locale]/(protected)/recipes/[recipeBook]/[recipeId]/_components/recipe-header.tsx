"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompleteRecipe } from "@/lib/type";
import { useRef } from "react";
import { Ban } from "lucide-react";

export function RecipeHeader({
  recipe,
  multiplier,
  setMultiplier,
}: {
  recipe: CompleteRecipe;
  multiplier: number;
  setMultiplier: (value: number) => void;
}) {
  const multiplierRef = useRef<HTMLInputElement>(null);

  return (
    <div className='grid gap-2 grid-cols-1 md:grid-cols-2 p-2'>
      <div className='w-full bg-stone-300 rounded-lg p-5'> Recipe Image</div>
      <div className='m-5 space-y-4 flex flex-col'>
        <div className='flex gap-4 justify-between'>
          <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
            <p className='font-bold'>Préparation:</p> {recipe.preparationTime}{" "}
            min
          </div>
          <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
            <p className='font-bold'>Cuisson:</p> {recipe.cookingTime} min
          </div>
          <div className='border rounded-lg p-3 flex flex-col gap-2 w-[150px]'>
            <p className='font-bold'>Rendement:</p> {recipe.yield * multiplier}{" "}
            {recipe.unit.toLowerCase()}
          </div>
        </div>
        <p>{recipe.description}</p>
        <div className='flex flex-col gap-2'>
          <p className='font-bold'>Livre de recette:</p>
          <div className='w-auto inline-flex flex-none'>
            <Badge variant='default'>{recipe.recipeBook.name}</Badge>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-bold'>Allergènes:</p>
          <div className='w-auto inline-flex flex-none'>
            <Ban className='text-muted' />
          </div>
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
    </div>
  );
}
