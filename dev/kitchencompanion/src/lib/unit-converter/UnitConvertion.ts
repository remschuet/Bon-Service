export type Ingredient = {
  name: string;
  value: number; // 12 * 5 boites ou 5 lbs,
  unitMeasure: string;
  price: number;
};

abstract class UnitConversionStrategy {
  abstract convert(ingredient: Ingredient): number;
}

interface SolidUnits {
  [unit: string]: number;
}

export class UnitPriceConverter {
  private pricePrecision: number = 100000;

  private priceConverter(price: number, value: number): number {
    return Math.floor((price * this.pricePrecision) / value);
  }

  public convert(
    ingredient: Ingredient,
    strategy: UnitConversionStrategy
  ): [number, number] {
    const convertedValue: number = strategy.convert(ingredient);
    const pricePerUnit: number = ingredient.price;
    const convertedPrice: number = this.priceConverter(
      pricePerUnit,
      convertedValue
    );
    return [convertedValue, convertedPrice];
  }
}

export class SolidConversionStrategy extends UnitConversionStrategy {
  solidUnits: SolidUnits = { g: 1, kg: 1000, lbs: 453.592, oz: 28.3495 };
  convert(ingredient: Ingredient): number {
    const convertedValue =
      ingredient.value * this.solidUnits[ingredient.unitMeasure];
    return convertedValue;
  }
}
