import { Contact, User, UserTypes } from "@prisma/client";
import { addContact, removeSpecificContact } from "../_action/contact-action";
import { describe, expect, test } from "@jest/globals";
import { createUser, deleteUser, getUser } from "@/db/data-access/user";
import { deleteContact, getContact } from "@/db/data-access/contact";

let userTest = {
  id: "To be getting",
  name: "__TEST_MARTIN",
  email: "__TEST_.test@test.com",
  password: "__TEST_secret",
  userType: UserTypes.ADMIN,
};

let contact = {
  id: "To be getting",
  userId: "To be getting",
  name: "__TEST_Martin123",
  description: "contact test",
  phoneNumber: "123 123 1212",
  compteNumber: "test compte",
};

// Before all the tests
// Create user and get the id
beforeAll(async () => {
  try {
    await createUser(userTest as User);
    const createdUser = await getUser(userTest.email);
    if (createdUser) {
      userTest.id = createdUser.id;
      contact.userId = createdUser.id;
    } else {
      console.log("UserTest not created");
    }
  } catch (err) {
    // try to destroy user
    await deleteUser(userTest.email);
    console.error(
      "Erreur initialisation userTest (user existe deja, clé étrangère, problème interne)"
    );
  }
});

// After all the tests
// Remove the user
afterAll(async () => {
  try {
    await deleteUser(userTest.email);
  } catch (err) {
    console.error("Erreur suppression du user pour les tests");
  }
});

// Test if the tests workings
describe("Verify if test working", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("Test contact", () => {
  // Test creation contact
  it("Créer contact: succès", async () => {
    const result = await addContact(contact as Contact, []);
    const createdContact = await getContact(
      contact.userId,
      contact.name,
      contact.phoneNumber
    );

    if (createdContact) {
      contact.id = createdContact.id;
    } else {
      console.error("Contact not created");
    }
    expect(result).toEqual({
      success: "Le contact a été créé avec succès.",
      status: 200,
    });
  });
  // Test suppression contact
  it("Supprimer contact: succès", async () => {
    const result = await removeSpecificContact(contact.id);
    expect(result).toEqual({
      success: "Le contact a été supprimé avec succès.",
      status: 200,
    });
  });
});
