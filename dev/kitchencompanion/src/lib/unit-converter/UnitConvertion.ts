export type Ingredient = {
  name: string;
  value: number;
  unitMeasure: string;
  price: number;
};

abstract class UnitConversionStrategy {
  abstract convert(ingredient: Ingredient): number;
}

interface SolidUnits {
  [unit: string]: number;
}

export class SolidConversionStrategy extends UnitConversionStrategy {
  solidUnits: SolidUnits = { g: 1, kg: 1000, lbs: 453.592, oz: 28.3495 };
  convert(ingredient: Ingredient): number {
    const convertedValue =
      ingredient.value * this.solidUnits[ingredient.unitMeasure];
    return convertedValue;
  }
}
