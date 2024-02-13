"use client";
import FormWrapper from "@/components/auth/formWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <FormWrapper title={"Error"}>
        <div>There was an error</div>
        <Button
          className="flex gap-2 w-full mt-3 bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all"
          onClick={handleBack}
        >
          Back to previous page
        </Button>
      </FormWrapper>
    </div>
  );
};

export default ErrorPage;
