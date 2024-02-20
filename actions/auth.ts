"use server";
import { SignInSchema, SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/data/user";
import {
  generateVerificationToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/verification-token";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/db";

export const signIn = async (body: z.infer<typeof SignInSchema>) => {
  const validateBody = SignInSchema.safeParse(body);
  if (!validateBody.success) {
    return {
      error: "Invalid fields",
    };
  }
  // ...
};

export const signUp = async (body: z.infer<typeof SignUpSchema>) => {
  const validateBody = SignUpSchema.safeParse(body);
  if (!validateBody.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { name, email, password } = validateBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existUser = await getUserByEmail(email);
  if (existUser) {
    return {
      error: "User already exists",
    };
  }
  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken?.token as string);
  return {
    success: "Confirmation email sent!",
  };
};

export const verifyEmail = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);
  if (!verificationToken) return { error: "Token not found" };

  const ifExpired =
    new Date(verificationToken.expires).getTime() < new Date().getTime();
  if (ifExpired) return { error: "Token has expired" };

  const user = await getUserByEmail(verificationToken.email);
  if (!user) return { error: "User not found" };

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Email verified" };
};
