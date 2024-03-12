import { UserTypes, User } from "@prisma/client";
import { db } from "@/db/prisma_db";

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

export async function getUser(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}
