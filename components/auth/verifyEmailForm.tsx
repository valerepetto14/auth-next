"use client";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { verifyEmail } from "@/actions/auth";
import FormError from "../formMessage/formError";
import FormSuccess from "../formMessage/formSuccess";
import { useRouter } from "next/navigation";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Invalid token");
      return;
    }
    verifyEmail(token)
      .then((res) => {
        console.log("res", res);
        setError(res.error as string);
        setSuccess(res.success as string);
        if (res.success) {
          setTimeout(() => {
            router.push("/auth/signin");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p>
        Please check your email for a verification link. Click the link to
        complete the verification process.
      </p>
      <div className="flex items-center justify-center mt-6">
        {!success && !error && <BeatLoader color="#2563EB" />}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  );
};

export default VerifyEmailForm;
