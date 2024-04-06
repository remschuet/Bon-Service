import {
  UnitPriceConverter,
  SolidConversionStrategy,
  Ingredient,
} from "./UnitConvertion";

describe("SolidConversionStrategy", () => {
  let conversionStrategy: SolidConversionStrategy;

  beforeEach(() => {
    conversionStrategy = new SolidConversionStrategy();
  });

  /*Test grams to kilograms*/
  test("converts grams to kilograms correctly", () => {
    const ingredient: Ingredient = {
      name: "Flour",
      value: 500,
      unitMeasure: "g",
      price: 1.5,
    };
    const expectedValue = 500;
    const convertedValue = conversionStrategy.convert(ingredient);
    expect(convertedValue).toBeCloseTo(expectedValue, 0.5);
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
    expect(convertedValue).toBeCloseTo(expectedValue, 0.05);
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

describe("UnitPriceConverter", () => {
  let converter: UnitPriceConverter;
  let solidStrategy: SolidConversionStrategy;

  beforeEach(() => {
    converter = new UnitPriceConverter();
    solidStrategy = new SolidConversionStrategy();
  });

  test("converts ingredient value and price correctly", () => {
    const ingredient: Ingredient = {
      name: "Flour",
      value: 500, // 500 grams
      unitMeasure: "g",
      price: 1.5, // $1.5 per gram
    };

    const [convertedValue, convertedPrice] = converter.convert(
      ingredient,
      solidStrategy
    );

    // Expected value: 500 grams * 1 (because solidUnits['g'] is 1) = 500 grams
    expect(convertedValue).toBe(500);

    // Expected price: 500 grams * $1.5 per gram = $750
    expect(convertedPrice).toBe(300);
  });
});
