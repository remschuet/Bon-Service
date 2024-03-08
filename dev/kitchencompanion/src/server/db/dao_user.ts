import { PrismaClient, UserTypes, User } from "@prisma/client";
import * as argon2 from "argon2";

const db = new PrismaClient();

export async function createUser(user: User) {
  const hashedPassword = await argon2.hash(user.password);

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
