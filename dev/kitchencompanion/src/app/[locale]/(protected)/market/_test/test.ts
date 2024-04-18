import { Ingredient, Unit } from "@prisma/client";
import { createOrUpdateIgredient } from "@/app/[locale]/(protected)/market/_action/ingredient-action";
import { describe, expect } from "@jest/globals";
import { getUser } from "@/db/data-access/user";
import { userTest } from "@/jest.setup";
import {
  getIngredientIfExist,
  getIngredient,
  deleteIngredient,
} from "@/db/data-access/ingredient";

let ingredientTest: Ingredient = {
  id: "1234",
  userId: "1234",
  name: "__TEST_PATATE",
  price: 3.99,
  unit: Unit.KG,
  category: "Fruits et légumes",
  origin: "QC",
  supplierName: "__TEST_Martin",
};
/*
 * Setup the contact tests
 * get the userTest real id
 */
beforeAll(async () => {
  try {
    const createdUser = await getUser(userTest.email);
    if (createdUser) {
      userTest.id = createdUser.id;
      ingredientTest.userId = userTest.id;
    }
  } catch {
    console.error("beforeAll market/test");
    console.log("userTestId: " + userTest.id);
  }
});

afterAll(async () => {
  try {
    await deleteIngredient(ingredientTest.id);
  } catch (err) {
    console.error("afterAll market/test");
  }
});

describe("Test ingredient", () => {
  // Test create contact
  it("Create ingredient: success", async () => {
    const result = await createOrUpdateIgredient(ingredientTest);
    // Get the id of the created ingredient to remove it
    const createdIngredient = await getIngredient(
      ingredientTest.name,
      ingredientTest.supplierName,
      ingredientTest.userId
    );
    if (createdIngredient) {
      ingredientTest.id = createdIngredient.id;
    } else {
      console.error("ingredient not created");
    }
    expect(result).toEqual({
      success: "Ingrédient ajouté avec succès",
      status: 200,
    });
  });
});
