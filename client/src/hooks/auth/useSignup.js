import { useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "../../api/api";
import { handleInputError } from "../../utils/handleInputError";
import { setUserToClient } from "../../utils/setUserToClient";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { changeCurrentEmail, changeUserStatus, currentEmail } = useStore(
    (store) => store
  );

  const { setAuthUser } = useAuthContext();

  const handleSignup = async (data) => {
    const success = handleInputError(data);
    if (!success) return;
    try {
      setLoading(true);
      const fetchedData = await apiPost("user/signup", {
        ...data,
        email: currentEmail,
        phone: "7033249582",
      });
      if (!fetchedData.status) {
        toast.error(fetchedData.message);
      } else {
        setUserToClient(fetchedData.user);
        setAuthUser(fetchedData.user);
        console.log(fetchedData.user);
        toast.success("user signup successfully", {
          id: "signup",
        });
        changeCurrentEmail(null);
        changeUserStatus("AUTHORIZE");
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
