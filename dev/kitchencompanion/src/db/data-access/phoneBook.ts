import { RecipeBook, Allergen, Recipe, PhoneBook } from "@prisma/client";
import { db } from "@/db/prisma-db";
import { Prisma } from "@prisma/client";

export async function createPhoneBook(phoneBook: PhoneBook) {
  try {
    return await db.phoneBook.create({
      data: {
        userId: phoneBook.userId,
        name: phoneBook.name,
        description: phoneBook.description,
        phoneNumber: phoneBook.phoneNumber,
        compteNumber: phoneBook.compteNumber,
        isPublic: phoneBook.isPublic,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: createPhoneBook(), error: ",
      error
    );
  }
}

export async function createManyPhoneBook(phoneBook: PhoneBook[]) {
  try {
    return await db.phoneBook.createMany({
      data: phoneBook,
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: createManyPhoneBook(), error: ",
      error
    );
  }
}

export async function deleteAllPhoneBook(userId: string) {
  try {
    return await db.phoneBook.deleteMany({
      where: { userId: userId },
    });
  } catch (error) {
    console.error(
      "Error data-access/phoneBook: deleteAllPhoneBook(), error: ",
      error
    );
  }
}
