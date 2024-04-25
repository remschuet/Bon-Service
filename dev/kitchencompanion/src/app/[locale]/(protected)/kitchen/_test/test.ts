import { Kitchen } from "@prisma/client";
import { addKitchen } from "@/app/[locale]/(protected)/kitchen/_action/kitchen-action";
import { describe, expect } from "@jest/globals";
import { getUser } from "@/db/data-access/user";
import { userTest } from "@/jest.setup";
import {
  deleteKitchen,
  getKitchenByAdminAndName,
} from "@/db/data-access/kitchen";

let kitchenTest: Kitchen = {
  id: "1234",
  userId: "1234",
  name: "__TEST_KITCHEN",
  costObjective: 12,
  description: "kitchen test",
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
      kitchenTest.userId = userTest.id;
    }
  } catch {
    console.error("beforeAll kitchen/test");
    console.log("userTestId: " + userTest.id);
  }
});

afterAll(async () => {
  try {
    await deleteKitchen(kitchenTest);
  } catch (err) {
    console.error("afterAll kitchen/test");
  }
});

describe("Test kitchen", () => {
  // Test create contact
  it("Create kitchen: success", async () => {
    const result = await addKitchen(kitchenTest);
    // Get the id of the created kitchen to remove it
    const createdKitchen = await getKitchenByAdminAndName(
      kitchenTest.userId,
      kitchenTest.name
    );
    if (createdKitchen) {
      kitchenTest.id = createdKitchen.id;
    } else {
      console.error("kitchen not created");
    }
    expect(result).toEqual({
      success: "La cuisine a été créée avec succès.",
      status: 200,
    });
  });

  // Test create kitchen, already exist
  it("Create kitchen: error, already exist", async () => {
    try {
      const result = await addKitchen(kitchenTest);

      expect(result).toEqual({
        error: "Il existe déjà une cuisine portant ce nom.",
        status: 200,
      });
    } catch (err) {}
  });
});
