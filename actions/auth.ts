"use server";
import { SignInSchema, SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/data/user";
import { generateVerificationToken } from "@/data/verification-token";

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

  return {
    success: "Confirmation email sent!",
  };
};
