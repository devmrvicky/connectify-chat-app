import { useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "../../api/api";
import { useAuthContext } from "../../context/AuthContext";
import { setUserToClient } from "../../utils/setUserToClient";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Username and password must be required");
      return;
    }
    try {
      setLoading(true);
      const data = await apiPost("user/login", { username, password });
      if (!data.status) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      console.log("user login successfully " + data.user.fullName);
      setAuthUser(data.user);
      setUserToClient(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
