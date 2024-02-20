"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schemas/index";
import * as z from "zod";
import clsx from "clsx";
import FormError from "../formMessage/formError";
import FormSuccess from "../formMessage/formSuccess";
import { signUp } from "@/actions/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    setError(null);
    setIsPending(true);
    setSuccess(null);
    signUp(data)
      .then((res) => {
        setError(res.error as string);
        setSuccess(res.success as string);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/4 px-12">
      <form
        className="flex flex-col gap-2"
        {...form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <label className="font-semibold text-sm" htmlFor="">
          Name
        </label>
        <Input
          type="text"
          disabled={isPending}
          placeholder="Name"
          {...form.register("name")}
          className={clsx({
            "border-red-600": form.formState.errors.name,
            "bg-red-100": form.formState.errors.name,
            "px-5 py-2 border bg-gray-200 rounded mb-2": true,
          })}
        />
        <span className="font-semibold text-xs text-red-600">
          {form.formState.errors.name?.message}
        </span>
        <label className="font-semibold text-sm" htmlFor="">
          Email
        </label>
        <Input
          type="email"
          disabled={isPending}
          placeholder="Email"
          {...form.register("email")}
          className={clsx({
            "border-red-600": form.formState.errors.email,
            "bg-red-100": form.formState.errors.email,
            "px-5 py-2 border bg-gray-200 rounded mb-2": true,
          })}
        />
        <span className="font-semibold text-xs text-red-600">
          {form.formState.errors.email?.message}
        </span>

        <label className="font-semibold text-sm" htmlFor="">
          Password
        </label>
        <div className="relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            disabled={isPending}
            placeholder="Password"
            {...form.register("password")}
            className={clsx({
              "border-red-600": form.formState.errors.password,
              "bg-red-100": form.formState.errors.password,
              "px-5 py-2 border bg-gray-200 rounded mb-2": true,
            })}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-0 top-0 mt-3 mr-4"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <span className="font-semibold text-xs text-red-600">
          {form.formState.errors.password?.message}
        </span>
        <label className="font-semibold text-sm" htmlFor="">
          Confirm Password
        </label>
        <Input
          type="password"
          disabled={isPending}
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
          className={clsx({
            "border-red-600": form.formState.errors.confirmPassword,
            "bg-red-100": form.formState.errors.confirmPassword,
            "px-5 py-2 border bg-gray-200 rounded mb-1": true,
          })}
        />
        <span className="font-semibold text-xs text-red-600">
          {form.formState.errors.confirmPassword?.message}
        </span>
        <Button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all"
        >
          {isPending ? (
            <ClipLoader color="white" loading={isPending} size={20} />
          ) : (
            "Sign Up"
          )}
        </Button>
        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
      <div className="mt-2 flex gap-2">
        <p>Already have an account?</p>
        <Link className="font-bold" href="/auth/signin">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
