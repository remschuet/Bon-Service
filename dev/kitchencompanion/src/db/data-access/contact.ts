import { RecipeBook, Allergen, Recipe, Contact } from "@prisma/client";
import { db } from "@/db/prisma-db";

////////////////////////////////
// TABLES
// Contact
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
        isPublic: contact.isPublic,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: createContact(), error: ",
      error
    );
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
      "Error data-access/phoneBook: createManyContact(), error: ",
      error
    );
  }
}

/**
 * Description: Get all contacts associated with a given user ID (public and private).
 * @param userId - The ID of the user whose contacts should be retrieved.
 * @returns An array of contact objects.
 */
export async function getAllContactForAdmin(userId: string) {
  try {
    return await db.contact.findMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: getAllContact(), error: ",
      error
    );
  }
}

/**
 * Description: Get all contacts associated with a given user ID (public only).
 * @param userId - The ID of the user whose contacts should be retrieved.
 * @returns An array of contact objects.
 */
export async function getAllContactForMember(userId: string) {
  try {
    return await db.contact.findMany({
      where: { userId: userId, isPublic: true },
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: getAllContact(), error: ",
      error
    );
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
      "Error data-access/phoneBook: deleteAllContact(), error: ",
      error
    );
  }
}
