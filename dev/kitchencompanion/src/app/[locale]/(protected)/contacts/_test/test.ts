import { Contact } from "@prisma/client";
import { addContact, removeSpecificContact } from "../_action/contact-action";
import { describe, expect } from "@jest/globals";
import { getUser } from "@/db/data-access/user";
import { getContact } from "@/db/data-access/contact";
import { userTest } from "@/jest.setup";

let contact = {
  id: "To be getting",
  userId: "To be getting",
  name: "__TEST_Martin123",
  description: "contact test",
  phoneNumber: "123 123 1212",
  compteNumber: "test compte",
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
      contact.userId = userTest.id;
    }
  } catch {
    console.error("beforeAll contacts/test");
    console.log("userTestId: " + userTest.id);
    console.log("contactUserI: " + contact.userId);
  }
});

describe("Test contact", () => {
  // Test create contact
  it("Create contact: success", async () => {
    const result = await addContact(contact as Contact, []);
    // Get the id of the created contact to remove it
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
  // Test remove contact
  it("Remove contact: success", async () => {
    const result = await removeSpecificContact(contact.id);
    expect(result).toEqual({
      success: "Le contact a été supprimé avec succès.",
      status: 200,
    });
  });
});
