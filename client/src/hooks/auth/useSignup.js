import { useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { handleInputError } from "../../utils/handleInputError";
import { setUserToClient } from "../../utils/setUserToClient";
import { useAuthContext } from "../../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const handleSignup = async (data) => {
    const success = handleInputError(data);
    if (!success) return;
    try {
      setLoading(true);
      const fetchedData = await apiPost("user/signup", data);
      if (!fetchedData.status) {
        toast.error(fetchedData.message);
      } else {
        setUserToClient(fetchedData.user);
        setAuthUser(fetchedData.user);
        console.log(fetchedData.user);
        toast.success("user signup successfully", {
          id: "signup",
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};

export default useSignup;
