"use server";

import { createUser } from "@/data_access/user";
import { User } from "@prisma/client";

export type RegisterResponse = { error?: string };

export async function register(user: User) {
  try {
    await createUser(user);
  } catch (e: any) {
    return { error: e.message } as RegisterResponse;
  }
}
