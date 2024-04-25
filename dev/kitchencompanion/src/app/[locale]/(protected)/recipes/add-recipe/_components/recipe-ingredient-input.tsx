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
import {
  IngredientComponentDTO,
  RecipeDTO,
  RecipeIngredientDTO,
} from "@/lib/type";

export function RecipeIngredientInput() {
  const { ctx } = useNewRecipe();
  const { units } = useUnits();
  const { ingredientsJSON, recipesJSON, recipeIngredientsJSON } =
    useRecipeComponents();

  const ingredients = extractIngredients(ingredientsJSON);
  const recipes = extractRecipes(
    recipesJSON,
    recipeIngredientsJSON,
    ingredients
  );

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

function extractIngredients(ingredientsJSON: string): Ingredient[] {
  const rawIngredients = JSON.parse(
    ingredientsJSON
  ) as IngredientComponentDTO[];

  const ingredients = rawIngredients.map((ingredient) => {
    return new Ingredient({
      id: ingredient._id,
      name: ingredient._name,
      unit: ingredient._unit,
      price: ingredient._price,
    });
  });

  return ingredients;
}

function extractRecipes(
  recipesJSON: string,
  recipeIngredientJSON: string,
  ingredients: Ingredient[]
): Recipe[] {
  const rawRecipes = JSON.parse(recipesJSON) as RecipeDTO[];
  const rawIngredients = JSON.parse(recipeIngredientJSON);

  // Create a map of ingredients by their ID for quick lookup
  const ingredientMap: Map<string, Ingredient> = new Map();
  ingredients.forEach((ingredient) => {
    ingredientMap.set(ingredient.id, ingredient);
  });

  // Create a map of recipes to be able to reference them by id when reconstructing the recipe components
  const recipesMap: Map<string, Recipe> = new Map();
  rawRecipes.forEach((recipe) => {
    const importedRecipe = new Recipe();
    importedRecipe.name = recipe._name;
    importedRecipe.recipeData = recipe._recipeData;
    recipesMap.set(recipe._recipeData.id!, importedRecipe);
  });
  
  // Reconstruct the recipe components from the raw data and the maps
  recipesMap.forEach((importedRecipe, id) => {
    const index = Array.from(recipesMap.keys()).findIndex((key) => key === id);

    const recipeIngredients = rawIngredients[index].map(
      (ingredient: RecipeIngredientDTO) => ingredient
    );

    let selectedIngredient: Ingredient | Recipe;

    recipeIngredients.forEach((ingredient: RecipeIngredientDTO) => {
      if (ingredient.ingredientId) {
        selectedIngredient = ingredientMap.get(
          ingredient.ingredientId as string
        )!;
      } else if (ingredient.recipeIngredientId) {
        selectedIngredient = recipesMap.get(
          ingredient.recipeIngredientId as string
        )!;
      }

      if (!selectedIngredient) {
        throw new Error(
          `Ingredient not found for id: ${ingredient.ingredientId}`
        );
      }

      const newIngredient: RecipeComponent = {
        component: selectedIngredient,
        id:
          selectedIngredient instanceof Ingredient
            ? (ingredient.ingredientId as string)
            : (ingredient.recipeIngredientId as string),
        name: selectedIngredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit as Unit,
      };

      importedRecipe.add(newIngredient);
    });
  });

  return Array.from(recipesMap.values());
}
