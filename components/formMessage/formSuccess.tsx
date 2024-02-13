import { GrStatusGood } from "react-icons/gr";

interface FormSuccessProps {
  message: string | null;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3">
      <GrStatusGood />
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;
