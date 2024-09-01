import { useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "../../api/api";
import { handleInputError } from "../../utils/handleInputError";
import { setUserToClient } from "../../utils/setUserToClient";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import { SERVER_URL } from "../../api/serverUrl";

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
      const tempData = { ...data };
      delete data.profileImg;
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append("profileImg", tempData.profileImg, Date.now());
      formData.append("email", currentEmail);
      formData.append("phone", "7033249582");
      const res = await fetch(`${SERVER_URL}/api/user/signup`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const fetchedData = await res.json();
      if (!fetchedData.status) {
        toast.error(fetchedData.message);
      } else {
        setUserToClient(fetchedData.user);
        setAuthUser(fetchedData.user);
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
