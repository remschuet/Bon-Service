import { UserTypes, User } from "@prisma/client";
import { db } from "@/db/prisma-db";

export async function createUser(user: User) {
  if (user.userType === UserTypes.MEMBER) {
    return await db.user.create({
      data: {
        email: user.email,
        password: user.password,
        userType: UserTypes.MEMBER,
      },
    });
  }

  return await db.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
}

export async function getUsers() {
  return await db.user.findMany();
}

export async function getUser(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

export async function updateUserRole(email: string) {
  return await db.user.update({
    where: { email },
    data: {
      userType: UserTypes.ADMIN,
    },
  });
}

export async function deleteUser(email: string) {
  return await db.user.delete({
    where: { email },
  });
}

// KITCHENS
export async function getKitchensByAdmin(user: User) {
  // Return all kitchens where user is the administrator
  return await db.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      kitchens: true,
    },
  });
}

export async function getKitchensByAdminById(id: string) {
  // Return all kitchens where user is the administrator
  return await db.user.findFirst({
    where: {
      id,
    },
    include: {
      kitchens: true,
    },
  });
}

// DEV FONCTIONS
export async function dev_getAllKitchen() {
  // Return all user and all there kitchens
  const users = await db.user.findMany({
    include: {
      kitchens: true,
    },
  });

  return users;
}
