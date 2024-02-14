import FormWrapper from "@/components/auth/formWrapper";
import SignInForm from "@/components/auth/signInForm";
const SignInPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-10">Sign in</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
