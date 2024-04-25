import { RecipeBook, Allergen, Recipe, Contact } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Contact
// ContactKitchen
// besoin d action quand on créer en fonction si publique de creer le link
// get ta kitchen
// get les contacts en lien

////////////////////////////////

/**
 * Description: Create a new contact in the database.
 * @param contact - The contact object to be created.
 * @returns The created contact object.
 */
export async function createContact(contact: Contact) {
  try {
    return await db.contact.create({
      data: {
        userId: contact.userId,
        name: contact.name,
        description: contact.description,
        phoneNumber: contact.phoneNumber,
        compteNumber: contact.compteNumber,
      },
    });
  } catch (error) {
    console.error("Error data-access/contact: createContact(), error: ", error);
    throw error;
  }
}

/**
 * Creates multiple contacts in the database.
 * @param contact - An array of contact objects to be created.
 * @returns The created contact objects.
 */
export async function createManyContact(contact: Contact[]) {
  try {
    return await db.contact.createMany({
      data: contact,
    });
  } catch (error) {
    console.error(
      "Error data-access/contact: createManyContact(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Description: Get all contacts associated with a given user ID (ADMIN).
 * @param userId - The ID of the user whose contacts should be retrieved.
 * @returns An array of contact objects.
 */
export async function getAllContact(userId: string) {
  try {
    return await db.contact.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error("Error data-access/contact: getAllContact(), error: ", error);
    throw error;
  }
}

/**
 * Description: Get a contact by userId, name, and phoneNumber.
 * @param userId - The userId of the contact.
 * @param name - The name of the contact.
 * @param phoneNumber - The phoneNumber of the contact.
 * @returns The contact if found, or null if not found.
 */
export async function getContact(
  userId: string,
  name: string,
  phoneNumber: string
) {
  try {
    return await db.contact.findFirst({
      where: {
        userId: userId,
        name: name,
        phoneNumber: phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error data-access/contact: getContact(), error: ", error);
    throw error;
  }
}

/**
 * Deletes a contact from the database by its ID.
 * @param id - The ID of the contact to delete.
 * @returns A promise that resolves to the deleted contact.
 * @throws An error if the contact does not exist or if there is an issue with the database operation.
 */
export async function deleteContact(id: string) {
  try {
    return await db.contact.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error data-access/contact: deleteContact(), error: ", error);
    throw error;
  }
}

/**
 * Delete all contacts associated with a given user ID (ADMIN).
 * @param userId - The ID of the user (ADMIN) whose contacts should be deleted.
 * @returns The number of contacts that were deleted.
 */
export async function deleteAllContact(userId: string) {
  try {
    return await db.contact.deleteMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/contact: deleteAllContact(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Updates the status of a contact in the database.
 * @param contactId - The ID of the contact to update.
 * @param isPublic - Whether the contact should be marked as public or private.
 * @returns The updated contact object.
 */
export async function updateContact(contactId: string, contact: Contact) {
  try {
    return await db.contact.update({
      where: { id: contactId },
      data: {
        name: contact.name,
        description: contact.description,
        phoneNumber: contact.phoneNumber,
        compteNumber: contact.compteNumber,
      },
    });
  } catch (error) {
    console.error("Error data-access/contact: updateContact(), error: ", error);
    throw error;
  }
}

/**
 * Creates a new link between a contact and a kitchen in the database.
 * @param contactId - The ID of the contact to link.
 * @param kitchenId - The ID of the kitchen to link.
 * @param isPublic - Whether the link should be public or private.
 * @returns The created link object.
 */
export async function linkContactKitchen(contactId: string, kitchenId: string) {
  try {
    return await db.contactKitchen.create({
      data: {
        contactId: contactId,
        kitchenId: kitchenId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/contact: linkContactKitchen(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Description: Get all links between a kitchen and its associated contacts.
 * @param kitchenId - The ID of the kitchen.
 * @returns An array of contact-kitchen link objects.
 */
export async function getAllContactLinksToKitchen(kitchenId: string) {
  try {
    return await db.contactKitchen.findMany({
      where: {
        kitchenId: kitchenId,
      },
      include: {
        contact: true,
      }
    });
  } catch (error) {
    console.error(
      "Error data-access/contact: getAllContactLinksToKitchen(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Delete a link between a contact and a kitchen in the database.
 * @param contactId - The ID of the contact to unlink.
 * @param kitchenId - The ID of the kitchen to unlink.
 * @returns A promise that resolves to the delete kitchen.
 */
export async function deleteLinkContactKitchen(
  contactId: string,
  kitchenId: string
) {
  try {
    return await db.contactKitchen.deleteMany({
      where: {
        contactId: contactId,
        kitchenId: kitchenId,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/contact: linkContactKitchen(), error: ",
      error
    );
    throw error;
  }
}
