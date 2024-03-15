import { SolidConversionStrategy, Ingredient } from "./UnitConvertion";
describe("SolidConversionStrategy", () => {
  let conversionStrategy: SolidConversionStrategy;

  beforeEach(() => {
    conversionStrategy = new SolidConversionStrategy();
  });

  test("converts grams to kilograms correctly", () => {
    const ingredient: Ingredient = {
      name: "Flour",
      value: 500,
      unitMeasure: "g",
      price: 1.5,
    };
    const expectedValue = 500; // 500 grams = 0.5 kilograms
    const convertedValue = conversionStrategy.convert(ingredient);
    expect(convertedValue).toBeCloseTo(expectedValue, 0.5); // Adjust the precision as needed
  });

  test("converts pounds to grams correctly", () => {
    const ingredient: Ingredient = {
      name: "Sugar",
      value: 1,
      unitMeasure: "lbs",
      price: 2,
    };
    const expectedValue = 453.592; // 1 pound = 453.592 grams
    const convertedValue = conversionStrategy.convert(ingredient);
    expect(convertedValue).toBeCloseTo(expectedValue, 3); // Adjust the precision as needed
  });

  test("converts ounces to grams correctly", () => {
    const ingredient: Ingredient = {
      name: "Salt",
      value: 12,
      unitMeasure: "oz",
      price: 0.5,
    };
    const expectedValue = 340.194; // 12 ounces = 340.194 grams
    const convertedValue = conversionStrategy.convert(ingredient);
    expect(convertedValue).toBeCloseTo(expectedValue, 3); // Adjust the precision as needed
  });
});
