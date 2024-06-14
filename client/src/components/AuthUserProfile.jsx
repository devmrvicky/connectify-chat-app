import React from "react";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../context/AuthContext";

const AuthUserProfile = () => {
  const { authUser } = useAuthContext();
  return <UserProfile {...authUser} isAuthProfile={true} />;
};

export default AuthUserProfile;
