import { UserTypes, User } from "@prisma/client";
import { db } from "@/db/prisma_db";
import * as argon2 from "argon2";

export async function createUser(user: User) {
  const hashedPassword = await argon2.hash(user.password);

  if (user.userType === UserTypes.MEMBER) {
    return await db.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        userType: UserTypes.MEMBER,
      },
    });
  }

  return await db.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
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
