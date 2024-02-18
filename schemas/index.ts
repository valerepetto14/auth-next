import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(20),
});

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long",
      })
      .refine((value) => !/\d/.test(value), {
        message: "Name must not contain numbers",
      }),
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(20)
      .refine((value) => passwordRegex.test(value), {
        message:
          "Password must contain at least one uppercase letter and one number",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
