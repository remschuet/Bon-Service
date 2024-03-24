import { RecipeBook, Allergen, Recipe, Contact } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";

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
