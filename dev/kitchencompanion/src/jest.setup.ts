import { describe, expect, test } from "@jest/globals";
import { User, UserTypes } from "@prisma/client";
import { createUser, deleteUser } from "./db/data-access/user";

/**
 * This file is executed before all other Jest tests.
 * Its objective is to setup/initialize all the other tests.
 * `beforeAll` is called before the tests
 * `afterAll` is called after all the tests.
 *
 * isSilent: controls whether console.error or console.log messages are displayed
 * consoleLogSpy: controls the spy on console.log
 * consoleErrorSpy: controls the spy on console.error
 */
/*
const fs = require("fs");
const { execSync } = require("child_process");

// Chemin du fichier schema.prisma
const filePath = "./prisma/schema.prisma";

try {
  // Lire le contenu du fichier
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Remplacer les occurrences spécifiques
  fileContent = fileContent.replace(
    /env\("DATABASE_URL"\)/g,
    'env("DATABASE_URL_JEST")'
  );

  // Écrire le contenu modifié dans le fichier
  fs.writeFileSync(filePath, fileContent);

  // Exécuter les commandes prisma nécessaires
  execSync("npx prisma db push");
  execSync("npx prisma generate");
} catch (err) {
  console.error(`Error modifying file ${filePath}:`, err);
}
*/
const isSilent: boolean = true;

let consoleLogSpy: any = null;
let consoleErrorSpy: any = null;
if (isSilent) {
  consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
}
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

beforeEach(() => {
  // Clean the spy before calling
  jest.clearAllMocks();
  if (isSilent) {
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
  }
});

/**
 * Call before all tests
 * Initializes the userTest
 */
beforeAll(async () => {
  try {
    console.log("ENTRERING TEST");
    await createUser(userTest as User);
  } catch (err) {
    console.error(
      "Error init userTest (already exist, foreign key, wifi problem)"
    );
  }
});

/**
 * Call after all tests
 * Removing the userTest
 */
afterAll(async () => {
  try {
    console.log("EXITING TEST");
    await deleteUser(userTest.email);
    console.log("RESULTS");
  } catch (err) {
    console.error("Error delete userTest");
  }
  if (isSilent) {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
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
