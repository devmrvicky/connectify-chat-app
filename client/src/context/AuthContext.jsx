import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromClient } from "../utils/getUserFromClient";
import useStore from "../zustand/store";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const {changeUserStatus} = useStore(store => store)
  const [authUser, setAuthUser] = useState(getUserFromClient() || null);
  useEffect(() => {
    changeUserStatus(authUser ? "AUTHORIZE" : "UNAUTHORIZE")
  }, [authUser])
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuthContext, AuthContextProvider };
