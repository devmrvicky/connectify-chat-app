import React from "react";
import { apiPost } from "../../api/api";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { removeUserFromClient } from "../../utils/removeUserFromClient";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const res = await apiPost("user/logout");
      if (!res.status) {
        toast.error(res.message, {
          id: "logout error",
        });
        return;
      }
      setAuthUser(null);
      removeUserFromClient();
      toast.success(res.message, {
        id: "logout",
      });
    } catch (error) {
      console.log(`error while user logout ${error.message}`);
      toast.error(error.message, {
        id: "logout error",
      });
    }
  };

  return { logout };
};

export default useLogout;
