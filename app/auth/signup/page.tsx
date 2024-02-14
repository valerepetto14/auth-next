import FormWrapper from "@/components/auth/formWrapper";
import SignUpForm from "@/components/auth/signUpForm";

const SignInPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-10">Sign up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignInPage;
