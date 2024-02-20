import FormWrapper from "@/components/auth/formWrapper";
import VerifyEmailForm from "@/components/auth/verifyEmailForm";
import { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <Suspense>
      <FormWrapper title="Verify email">
        <VerifyEmailForm />
      </FormWrapper>
    </Suspense>
  );
};

export default VerifyEmailPage;
