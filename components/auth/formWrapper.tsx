interface FormWrapperProps {
  title: string;
  children?: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-10">{title}</h1>
      {children}
    </div>
  );
};

export default FormWrapper;
