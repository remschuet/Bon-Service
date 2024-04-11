import { RecipeState, UnitMeasure } from "@prisma/client";
import { Component } from "./component";

export interface RecipeData {
  name: string;
  yield: number;
  unit: UnitMeasure;
  description: string;
  category: string;
  recipeType: RecipeState;
  prepTime: number;
  cookTime: number;
  steps: string[];
}

export interface RecipeIngredient {
  component: Component;
  quantity: number;
  unit: UnitMeasure;
}

export class Recipe extends Component {
  private _ingredients: RecipeIngredient[] = [];
  private _recipeData: RecipeData;

  constructor(recipeData: RecipeData) {
    super(true);
    this._recipeData = recipeData;
  }

  public set recipeData(data: RecipeData) {
    this._recipeData = data;
  }

  public get recipeData(): RecipeData {
    return this._recipeData;
  }

  public addComponent(ingredient: RecipeIngredient): void {
    this._ingredients.push(ingredient);
    ingredient.component.parent = this;
  }

  public removeComponent(ingredient: RecipeIngredient): void {
    // Find the index of the component in the recipes array, remove it from the array
    const ingredientIndex = this._ingredients.indexOf(ingredient);
    this._ingredients.splice(ingredientIndex, 1);

    //Removes the parent reference for garbage collection
    ingredient.component.parent = null;
  }

  public suggestSalePrice(): number {
    throw new Error("Method not implemented.");
  }

  public calculateCost(quantity: number, unit: UnitMeasure): number {
    const rawCost = this._ingredients.reduce((acc, curr) => {
      const currIngredientCost = curr.component.calculateCost(
        curr.quantity,
        curr.unit
      ) as number;

      return acc + currIngredientCost;
    }, 0);

    return rawCost * 1.5;
  }
}
