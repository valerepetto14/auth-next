import { IoIosWarning } from "react-icons/io";

interface FormErrorProps {
  message: string | null;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3">
      <IoIosWarning />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
