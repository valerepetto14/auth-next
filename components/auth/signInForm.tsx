"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schemas/index";
import * as z from "zod";
import clsx from "clsx";
import FormError from "../formMessage/formError";
import FormSuccess from "../formMessage/formSuccess";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    setError(null);
    setSuccess(null);
    setIsPending(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          if (res.status === 401) {
            setError("Credentials are invalid");
          }
          if (res.status === 500) {
            setError("Server error");
          }
        } else {
          setSuccess("Signed in");
          router.push("/dashboard");
        }
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const googleSubmit = () => {
    setError(null);
    setSuccess(null);
    signIn("google", {
      callbackUrl: "/dashboard",
    }).then((res) => {
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/4 px-12">
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all"
        >
          {isPending ? (
            <ClipLoader color="white" loading={isPending} size={25} />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <div className="mt-2">
        <div className="flex gap-2">
          <p>Dont have an account?</p>
          <Link className="font-bold" href="/auth/signup">
            Sign Up
          </Link>
        </div>
        <Separator className="my-3" />
        <Button
          disabled={isPending}
          className="flex gap-2 w-full mt-3 bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all"
          onClick={googleSubmit}
        >
          <FaGoogle />
          <span>Sign In with Google</span>
        </Button>
      </div>
      <div className="mt-10">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </div>
  );
};

export default SignInForm;
