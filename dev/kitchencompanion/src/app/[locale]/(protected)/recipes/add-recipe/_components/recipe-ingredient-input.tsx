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
import { Recipe, RecipeComponent } from "@/lib/composite/recipe";
import { useRef, useState } from "react";
import { Unit } from "@prisma/client";
import { useRecipeComponents } from "@/hooks/useRecipeComponents";
import { IngredientList } from "./ingredients/ingredient-list";
import { Ingredient } from "@/lib/composite/ingredient";
import { useNewRecipe } from "@/hooks/useNewRecipe";

export function RecipeIngredientInput() {
  type IngredientDTO = {
    _id: string;
    _name: string;
    _unit: Unit;
    _price: number;
  };

  const { ctx } = useNewRecipe();
  const { units } = useUnits();
  const { ingredientsJSON, recipesJSON } = useRecipeComponents();

  const rawIngredients = JSON.parse(ingredientsJSON) as IngredientDTO[];

  const ingredients = rawIngredients.map((ingredient) => {
    return new Ingredient({
      id: ingredient._id,
      name: ingredient._name,
      unit: ingredient._unit,
      price: ingredient._price,
    });
  });

  const components = [...ingredients];

  const [selectedIngredient, setSelectedIngredient] = useState<
    Recipe | Ingredient
  >();

  const [unit, setUnit] = useState<Unit>();

  const ingredientRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    if (!selectedIngredient) {
      return;
    }
    let currId;

    if (selectedIngredient instanceof Recipe) {
      currId = selectedIngredient.recipeData.id!;
    } else {
      currId = selectedIngredient.id!;
    }

    const newIngredient: RecipeComponent = {
      component: selectedIngredient,
      id: currId,
      name: selectedIngredient.name,
      quantity: parseInt(quantityRef.current!.value),
      unit: unit as Unit,
    };

    ctx.setIngredients([...ctx.ingredients, newIngredient]);
  };

  const handleSearchParam = (searchParam: string): void => {
    ingredientRef.current!.value = searchParam;
    ingredients.forEach((ingredient) => {
      if (ingredient.name === searchParam) {
        setSelectedIngredient(ingredient);
      }
    });
  };

  return (
    <div className='relative flex min-h-[30vh] flex-col rounded-xl bg-stone-200 p-4 lg:col-span-2  lg:w-[45vw]'>
      <Badge
        variant={"secondary"}
        className='absolute right-3 top-3'>
        Ingrédients
      </Badge>
      <div className='flex-1 my-8'>
        <IngredientList />
      </div>
      <div className='flex gap-2 rounded-lg bg-background p-3 border'>
        <div className='flex flex-col w-full'>
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
          <div>
            {components
              .filter((ingredient) => {
                const searchParam = ingredientRef.current?.value.toLowerCase();
                const ingredientIsEqual =
                  ingredientRef.current?.value === searchParam;
                const ingredientName = ingredient.name.toLowerCase();

                return (
                  searchParam &&
                  ingredientIsEqual &&
                  ingredientName.includes(searchParam)
                );
              })
              .slice(0, 5)
              .map((ingredient, key) => (
                <div
                  key={key}
                  onClick={() => handleSearchParam(ingredient.name)}>
                  {ingredient.name}
                </div>
              ))}
          </div>
        </div>
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
          disabled={!selectedIngredient}
          onClick={handleAddIngredient}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
