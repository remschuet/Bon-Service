import { Component } from "@/lib/composite/component";
import { RecipeComponent } from "@/lib/composite/recipe";
import { unitConversions } from "@/lib/composite/unit-convertion";
import { Unit } from "@prisma/client";

export class Ingredient extends Component {
  private _price: number;
  private _unit: Unit;

  constructor(id: string, price: number, unit: Unit) {
    super({ id: id });
    this._price = price;
    this._unit = unit;
  }

  public add(component: Component | RecipeComponent): void {
    throw new Error("Ingredient is not a composite.");
  }

  public remove(component: Component | RecipeComponent): void {
    throw new Error("Ingredient is not a composite.");
  }

  public suggestSalePrice(): number {
    throw new Error("Ingredient does not have a sale price.");
  }

  public calculateCost(quantity?: number, unit?: string): number {
    if (unit == undefined || quantity == undefined) {
      throw new Error("Quantity and unit must be provided to calculate cost.");
    }

    let price = this._price;

    if (unit !== this._unit) {
      if (unitConversions[this._unit] && unitConversions[this._unit][unit]) {
        const conversionFactor = unitConversions[this._unit][unit];
        price /= conversionFactor;
      } else {
        throw new Error(
          `No conversion available from ${this._unit} to ${unit}`
        );
      }
    }

    return price * quantity;
  }
}
