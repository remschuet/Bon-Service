import { describe, expect, test } from "@jest/globals";
import { User, UserTypes } from "@prisma/client";
import { createUser, deleteUser } from "./db/data-access/user";

/*
  This file is execute before all the others jest tests
  The objectif is to setup/initialize all the other tests 
  beforeAll is called before the tests
  afterAll is called after all the tests
*/

/*
* The userAdmin for the tests
  Create before tests
  Delete after tests
*/
export let userTest = {
  id: "",
  name: "__TEST_MARTIN",
  email: "__TEST_.test@test.com",
  password: "__TEST_secret",
  userType: UserTypes.ADMIN,
};

/**
 * Call before all tests
 * Initializes the userTest
 */
beforeAll(async () => {
  console.log("ENTRERING TEST");
  try {
    await createUser(userTest as User);
  } catch (err) {
    console.error(
      "Error init userTest (already exist, foreign key, wifi problem)"
    );
  }
});

/*
 * The purpose is to verify if the jest tests are working properly
 * If it crashes then jest is brokent and not necessary the tests
 */
describe("Verify if test working", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

/**
 * Call after all tests
 * Removing the userTest
 */
afterAll(async () => {
  try {
    await deleteUser(userTest.email);
  } catch (err) {
    console.error("Error delete userTest");
  }
});
