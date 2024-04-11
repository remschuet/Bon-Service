import { RecipeState, UnitMeasure } from "@prisma/client";
import { Component } from "@/lib/composite/class/component";

export interface RecipeData {
  name: string;
  cost: number | null;
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

  public add(ingredient: RecipeIngredient): void {
    this._ingredients.push(ingredient);
    ingredient.component.parent = this;
  }

  public remove(ingredient: RecipeIngredient): void {
    //Removes the parent reference for garbage collection
    ingredient.component.parent = null;

    // Find the index of the component in the recipes array, remove it from the array
    const ingredientIndex = this._ingredients.indexOf(ingredient);
    this._ingredients.splice(ingredientIndex, 1);
  }

  public suggestSalePrice(): number {
    throw new Error("Method not implemented.");
  }

  public calculateCost(quantity?: number, unit?: UnitMeasure): number {
    const rawCost = this._ingredients.reduce((acc, curr) => {
      const currIngredientCost = curr.component.calculateCost(
        curr.quantity,
        curr.unit
      ) as number;

      return acc + currIngredientCost;
    }, 0);

    if (quantity === undefined || unit === undefined) {
      this._recipeData.cost = rawCost / this._recipeData.yield;
      return this._recipeData.cost;
    } else {
      if (this._recipeData.cost === null) {
        throw new Error("Cost of recipe is not defined.");
      }
      return this._recipeData.cost * quantity;
    }
  }
}

// const data: RecipeData = {
//   name: "maRecette",
//   cost: 10,
//   yield: 4,
//   unit: "KG",
//   description: "Une recette de test",
//   category: "Dessert",
//   recipeType: "RECIPE",
//   prepTime: 10,
//   cookTime: 20,
//   steps: ["Etape 1", "Etape 2", "Etape 3"],
// };

// const mesIngredients: RecipeIngredient[] = [
//   {
//     component: new Recipe(data),
//     quantity: 150,
//     unit: "G",
//   },
//   {
//     component: new Recipe(data),
//     quantity: 30,
//     unit: "ML",
//   },
// ];

// const maRecette = new Recipe(data);

// mesIngredients.forEach((ingredient) => {
//   maRecette.add(ingredient);
// });

// console.log(maRecette.calculateCost(1, "KG"));
