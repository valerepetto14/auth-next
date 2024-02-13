import FormWrapper from "@/components/auth/formWrapper";
import SignUpForm from "@/components/auth/signUpForm";

const SignInPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <FormWrapper title={"Sign In"}>
        <SignUpForm />
      </FormWrapper>
    </div>
  );
};

export default SignInPage;
