import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface loginValues {
  email: string;
  password: string;
}
interface useLoginreturn {
  error: string | null;
  loading: boolean | null;
  loginUser:(values:loginValues)=>Promise<void>
}

const useLogin = (): useLoginreturn => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const navigate =useNavigate()

  const validateLogin = (values: loginValues): boolean => {
    const regex = /^[^\s,]+$/;
    const { email, password } = values;

    if (!regex.test(email)) {
      setError("Email cannot contain spaces or commas.");
      return false;
    }

    if (!regex.test(password)) {
      setError("Password cannot contain spaces or commas.");
      return false;
    }
    setError(null);
    return true;
  };
  const loginUser = async (values: loginValues): Promise<void> => {
    if (!validateLogin(values)) {
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(
        "https://localhost:3000/api/auth/login",
        values
      );
      const data = response.data;
      if (response.status==200) {
        message.success(data.message)
        navigate("/dashboard")
      }
      else{
        setError(data.message)
        message.error(data.message)
      }
    } catch (error:any) { setError(error.response?.data?.message || "An error occurred");
        message.error(error.response?.data?.message || "An error occurred");}
        finally{
          setLoading(false)
        }
  };
  return{loading, error, loginUser};
};

export default useLogin