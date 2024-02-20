import { Input } from "../ui/input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPassword = () => {
  const [passwordvisible, setPasswordVisible] = useState(false);

  return (
    <Input type={passwordvisible ? "text" : "password"}>
      <button
        type="button"
        onClick={() => setPasswordVisible(!passwordvisible)}
        className="absolute right-0 top-0 mt-2 mr-2"
      >
        {passwordvisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </Input>
  );
};

export default InputPassword;
