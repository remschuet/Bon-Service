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
import { Recipe, RecipeComponent, RecipeData } from "@/lib/composite/recipe";
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

  type RecipeComponentDTO = {
    id: string;
    name: string;
    quantity: number;
    unit: Unit;
  };

  type RecipeDTO = {
    _name: string;
    _ingredients: RecipeComponentDTO[];
    _recipeData: RecipeData;
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

  const rawRecipes = JSON.parse(recipesJSON) as RecipeDTO[];

  const recipes = rawRecipes.map((recipe) => {
    const importedRecipe = new Recipe();
    let selectedIngredient;

    importedRecipe.name = recipe._name;
    importedRecipe.recipeData = recipe._recipeData;

    recipe._ingredients.forEach((ingredient) => {
      selectedIngredient = ingredients.find((ing) => ing.id === ingredient.id);

      if (!selectedIngredient) {
        selectedIngredient = recipes.find(
          (recipe) => recipe.name === ingredient.name
        );

        if (!selectedIngredient) {
          throw new Error("Ingredient not found");
        }
      }

      const newIngredient: RecipeComponent = {
        component: selectedIngredient,
        id: ingredient.id,
        name: selectedIngredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit as Unit,
      };

      importedRecipe.add(newIngredient);
    });

    return importedRecipe;
  });

  const components = [...ingredients, ...recipes];

  const [selectedIngredient, setSelectedIngredient] = useState<
    Recipe | Ingredient
  >();

  const [unit, setUnit] = useState<Unit>();
  const [searchParam, setSearchParam] = useState("");

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

    setSelectedIngredient(undefined);
    ingredientRef.current!.value = "";
    quantityRef.current!.value = "";
  };

  const handleSearchParam = (searchParam: string): void => {
    ingredientRef.current!.value = searchParam;
    components.forEach((ingredient) => {
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
        <div className='relative flex flex-col w-full'>
          <Label
            htmlFor='ingredients'
            className='sr-only'>
            Ingrédients
          </Label>
          <Input
            ref={ingredientRef}
            placeholder='Rechercher un ingrédient...'
            className='border-0'
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
          <div
            className={`absolute w-full bg-background z-10 top-12 rounded-lg`}>
            {components
              .filter((ingredient) => {
                const ingredientIsEqual =
                  ingredientRef.current?.value.toLowerCase() === searchParam;
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
                  className='hover:bg-stone-300/50 cursor-pointer p-2 rounded-md text-sm m-2'
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
