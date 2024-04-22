import { RecipeState, Unit } from "@prisma/client";
import { Component } from "@/lib/composite/component";
import { unitConversions } from "@/lib/composite/unit-convertion";
import { IngredientDTO, IngredientType } from "../type";

export type RecipeData = {
  id?: string;
  cost: number;
  yield: number;
  unit: Unit;
  description: string;
  recipeBook: string;
  recipeType: RecipeState;
  prepTime: number;
  cookTime: number;
  steps: string;
  version: string;
};

export type RecipeComponent = {
  component: Component;
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
};

export class Recipe extends Component {
  private _name: string;
  private _ingredients: RecipeComponent[] = [];
  private _recipeData: RecipeData = {} as RecipeData;

  constructor() {
    super(true);
    this._recipeData = {
      cost: 0,
      yield: 0,
      unit: "KG" as Unit,
      description: "",
      recipeBook: "",
      recipeType: "RECIPE" as RecipeState,
      prepTime: 0,
      cookTime: 0,
      steps: "",
      version: "1.0.0",
    } as RecipeData;

    this._name = "";
  }

  public set name(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set recipeData(data: RecipeData) {
    this._recipeData = data;
  }

  public get recipeData(): RecipeData {
    if (this._recipeData === undefined) {
      throw new Error("Recipe data is not defined");
    }
    return this._recipeData;
  }

  public add(ingredient: RecipeComponent): void {
    this._ingredients.push(ingredient);
    ingredient.component.parent = this;
  }

  public remove(ingredient: RecipeComponent): void {
    //Removes the parent reference for garbage collection
    ingredient.component.parent = null;

    // Find the index of the component in the recipes array, remove it from the array
    const ingredientIndex = this._ingredients.indexOf(ingredient);
    this._ingredients.splice(ingredientIndex, 1);
  }

  public removeAll(): void {
    //Removes the parent reference for garbage collection
    this._ingredients.forEach((ingredient) => {
      ingredient.component.parent = null;
    });

    this._ingredients = [];
  }

  public suggestSalePrice(): number {
    throw new Error("Method not implemented.");
  }

  public calculateCost(quantity?: number, unit?: Unit): number {
    const rawCost = this._ingredients.reduce((acc, curr) => {
      const currIngredientCost = curr.component.calculateCost(
        curr.quantity,
        curr.unit
      ) as number;

      return acc + currIngredientCost;
    }, 0);

    if (this.parent === null) {
      this._recipeData.cost = Number(
        (rawCost / this._recipeData.yield).toFixed(2)
      );

      console.log(this._recipeData.cost);
      return this._recipeData.cost;
    }

    if (quantity === undefined || unit === undefined) {
      throw new Error(
        "Quantity and unit must be provided when a recipe is used as an ingredient."
      );
    }

    if (unit !== this._recipeData.unit) {
      if (
        unitConversions[this._recipeData.unit] &&
        unitConversions[this._recipeData.unit][unit]
      ) {
        const conversionFactor = unitConversions[this._recipeData.unit][unit];
        const unitCost = rawCost / this._recipeData.yield / conversionFactor;
        console.log(unitCost, quantity);
        return Number((unitCost * quantity).toFixed(2));
      } else {
        throw new Error(
          `No conversion available from ${this._recipeData.unit} to ${unit}`
        );
      }
    }

    return Number(((rawCost / this._recipeData.yield) * quantity).toFixed(2));
  }

  public export(): FormData {
    const formData = new FormData();

    formData.append("name", this._name);
    formData.append("cost", this._recipeData.cost.toString());
    formData.append("yield", this._recipeData.yield.toString());
    formData.append("unit", this._recipeData.unit);
    formData.append("description", this._recipeData.description as string);
    formData.append("recipeBook", this._recipeData.recipeBook);
    formData.append("recipeType", this._recipeData.recipeType as string);
    formData.append("prepTime", this._recipeData.prepTime.toString());
    formData.append("cookTime", this._recipeData.cookTime.toString());
    formData.append("steps", this._recipeData.steps);
    formData.append("version", this._recipeData.version);

    const ingredients = this._ingredients.map((ingredient) => {
      return {
        id: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit as Unit,
        type:
          ingredient.component instanceof Recipe
            ? IngredientType.RECIPE
            : IngredientType.INGREDIENT,
      } as IngredientDTO;
    });

    formData.append("ingredients", JSON.stringify(ingredients));

    return formData;
  }
}
