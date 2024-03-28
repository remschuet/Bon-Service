import { UserTypes, User, VerificationToken } from "@prisma/client";
import { db } from "@/db/prisma-db";

/**
 * Creates a new user in the database.
 * @param user - The user object containing the user's details.
 * @returns A promise that resolves to the created user.
 */
export async function createUser(user: User) {
  try {
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
  } catch (error) {
    console.error("Error data-access/user: createUser(), error: ", error);
    throw error;
  }
}

/**
 * Updates a user password in the database.
 * @param user - The user object containing the user's details.
 * @returns A promise that resolves to the updated user.
 */

export async function updateUserPassword(email: string, password: string) {
  try {
    return await db.user.update({
      where: { email: email },
      data: {
        password: password,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/user: updateUserPassword(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Retrieves all users from the database.
 * @returns A promise that resolves to an array of users.
 */
export async function getAllUser() {
  try {
    return await db.user.findMany();
  } catch (error) {
    console.error("Error data-access/user: getAllUser(), error: ", error);
    throw error;
  }
}

/**
 * Retrieves a user by their email address.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the user object.
 */
export async function getUser(email: string) {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error data-access/user: getUser(), error: ", error);
    throw error;
  }
}

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user.
 * @returns A promise that resolves to the user object.
 */
export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error data-access/user: getUserById(), error: ", error);
    throw error;
  }
}

/**
 * Updates the role of a user to ADMIN.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the updated user object.
 */
export async function updateUserRole(email: string) {
  try {
    return await db.user.update({
      where: { email },
      data: {
        userType: UserTypes.ADMIN,
      },
    });
  } catch (error) {
    console.error("Error data-access/user: updateUserRole(), error: ", error);
    throw error;
  }
}

export async function userVerification(user: User, token: VerificationToken) {
  try {
    return await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: token.email,
      },
    });
  } catch (error) {
    console.error("Error data-access/user: userVerification(), error: ", error);
    throw error;
  }
}

/**
 * Deletes a user from the database.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the deleted user object.
 */
export async function deleteUser(email: string) {
  try {
    return await db.user.delete({
      where: { email },
    });
  } catch (error) {
    console.error("Error data-access/user: deleteUser(), error: ", error);
    throw error;
  }
}

// KITCHENS

/**
 * Retrieves all kitchens where the user is the administrator.
 * @param user - The user object.
 * @returns A promise that resolves to the user object with the associated kitchens.
 */
export async function getUserKitchens(user: User) {
  try {
    return await db.user.findFirst({
      where: {
        id: user.id,
      },
      include: {
        kitchens: true,
      },
    });
  } catch (error) {
    console.error("Error data-access/user: getUserKitchens(), error: ", error);
    throw error;
  }
}

/**
 * Retrieves all kitchens where the user with the specified ID is the administrator.
 * @param id - The ID of the user.
 * @returns A promise that resolves to the user object with the associated kitchens.
 */
export async function getAllUserKitchensById(id: string) {
  try {
    return await db.user.findMany({
      where: {
        id,
      },
      include: {
        kitchens: true,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/user: getAllUserKitchenById(), error: ",
      error
    );
    throw error;
  }
}

/**
 * Retrieves the user's role.
 * @param id - The user ID.
 * @returns The user's userType.
 */
export async function getUserUserType(id: string) {
  try {
    return await db.user.findFirst({
      where: {
        id,
      },
      select: {
        userType: true,
      },
    });
  } catch (error) {
    console.error("Error data-access/user: getUserUserType(), error: ", error);
    throw error;
  }
}

// DEV FUNCTIONS

/**
 * Retrieves all users and their associated kitchens.
 * @returns A promise that resolves to an array of users with their associated kitchens.
 */
export async function dev_getAllKitchen() {
  try {
    return await db.user.findMany({
      include: {
        kitchens: true,
      },
    });
  } catch (error) {
    console.error(
      "Error data-access/user: dev_getAllKitchen(), error: ",
      error
    );
    throw error;
  }
}
