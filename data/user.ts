import { db } from "@/lib/db";
import * as z from "zod";
import { SignUpSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const createUser = async (data: z.infer<typeof SignUpSchema>) => {
  try {
    const user = await db.user.create({
      data: {
        ...data,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
