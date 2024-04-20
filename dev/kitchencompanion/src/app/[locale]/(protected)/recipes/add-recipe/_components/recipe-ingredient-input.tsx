"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUnits } from "@/hooks/useUnits";
import { RecipeComponent } from "@/lib/composite/recipe";
import { useRef, useState } from "react";
import { Unit } from "@prisma/client";
import { useRecipeComponents } from "@/hooks/useRecipeComponents";

export function RecipeIngredientInput({
  onRemoveIngredient,
  setIngredientComponents,
}: {
  onRemoveIngredient: (id: string) => void;
  setIngredientComponents: (ingredientComponents: RecipeComponent[]) => void;
}) {
  const { units } = useUnits();
  const ingredients = useRecipeComponents();

  const [selectedIngredient, setSelectedIngredient] =
    useState<RecipeComponent>();

  const [unit, setUnit] = useState<Unit>();

  const ingredientRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    if (!selectedIngredient) {
      return;
    }
  };

  return (
    <div className='relative flex min-h-[30vh] flex-col rounded-xl bg-stone-200 p-4 lg:col-span-2  lg:w-[45vw]'>
      <Badge
        variant={"secondary"}
        className='absolute right-3 top-3'>
        Ingrédients
      </Badge>
      <div className='flex-1 space-y-[0.05rem] m-2'>
        {/* <IngredientList
          ingredients={ingredientComponents}
          onRemoveIngredient={onRemoveIngredient}
        /> */}
      </div>
      <div className='flex gap-2 rounded-lg bg-background p-3 border'>
        <Label
          htmlFor='ingredients'
          className='sr-only'>
          Ingrédients
        </Label>
        <Input
          ref={ingredientRef}
          placeholder='Rechercher un ingrédient...'
          className='border-0'
        />
        <div className='grid gap-3'>
          <Input
            type='number'
            ref={quantityRef}
            placeholder='Quantité'
            className='min-w-[100px]'
          />
        </div>
        <div className='grid gap-3'>
          <Select
            name='unit'
            onValueChange={(e) => setUnit(e as Unit)}>
            <SelectTrigger>
              <SelectValue placeholder='Unité' />
            </SelectTrigger>
            <SelectContent className='w-[80px]'>
              {units.map((unit) => (
                <SelectItem
                  key={unit}
                  value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className='gap-2'
          onClick={handleAddIngredient}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
