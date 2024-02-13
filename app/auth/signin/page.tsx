import FormWrapper from "@/components/auth/formWrapper";
import SignInForm from "@/components/auth/signInForm";
const SignInPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <FormWrapper title={"Sign In"}>
        <SignInForm />
      </FormWrapper>
    </div>
  );
};

export default SignInPage;
