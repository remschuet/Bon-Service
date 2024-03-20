import { UserTypes, User, VerificationToken } from "@prisma/client";
import { db } from "@/db/prisma-db";

/**
 * Creates a new user in the database.
 * @param user - The user object containing the user's details.
 * @returns A promise that resolves to the created user.
 */
export async function createUser(user: User) {
  if (user.userType === UserTypes.MEMBER) {
    return await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        userType: UserTypes.MEMBER,
      },
    });
  }

  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
}

/**
 * Updates a user password in the database.
 * @param user - The user object containing the user's details.
 * @returns A promise that resolves to the updated user.
 */

export async function updateUserPassword(email: string, password: string) {
  return await db.user.update({
    where: { email: email },
    data: {
      password: password,
    },
  });
}

/**
 * Retrieves all users from the database.
 * @returns A promise that resolves to an array of users.
 */
export async function getUsers() {
  return await db.user.findMany();
}

/**
 * Retrieves a user by their email address.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the user object.
 */
export async function getUser(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user.
 * @returns A promise that resolves to the user object.
 */
export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

/**
 * Updates the role of a user to ADMIN.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the updated user object.
 */
export async function updateUserRole(email: string) {
  return await db.user.update({
    where: { email },
    data: {
      userType: UserTypes.ADMIN,
    },
  });
}

export async function userVerification(user: User, token: VerificationToken) {
  return await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: token.email,
    },
  });
}

/**
 * Deletes a user from the database.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the deleted user object.
 */
export async function deleteUser(email: string) {
  return await db.user.delete({
    where: { email },
  });
}

// KITCHENS

/**
 * Retrieves all kitchens where the user is the administrator.
 * @param user - The user object.
 * @returns A promise that resolves to the user object with the associated kitchens.
 */
export async function getKitchensByAdmin(user: User) {
  return await db.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      kitchens: true,
    },
  });
}

/**
 * Retrieves all kitchens where the user with the specified ID is the administrator.
 * @param id - The ID of the user.
 * @returns A promise that resolves to the user object with the associated kitchens.
 */
export async function getKitchensByAdminById(id: string) {
  return await db.user.findMany({
    where: {
      id,
    },
    include: {
      kitchens: true,
    },
  });
}

// DEV FUNCTIONS

/**
 * Retrieves all users and their associated kitchens.
 * @returns A promise that resolves to an array of users with their associated kitchens.
 */
export async function dev_getAllKitchen() {
  const users = await db.user.findMany({
    include: {
      kitchens: true,
    },
  });

  return users;
}
