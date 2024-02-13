interface FormWrapperProps {
  title: string;
  children?: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, title }) => {
  return (
    <div className="mx-3 lg:mx-0 sm:w-full md:w-1/2 lg:w-1/4 rounded-lg bg-white shadow-lg">
      <div className="w-full p-6 md:p-10">
        <div className="w-full flex justify-center mb-6 md:mb-10">
          <h2 className="font-medium text-2xl md:text-2xl text-blue-600">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
