import { createContext, useContext, useState } from "react";
import { getUserFromClient } from "../utils/getUserFromClient";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(getUserFromClient() || null);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuthContext, AuthContextProvider };
