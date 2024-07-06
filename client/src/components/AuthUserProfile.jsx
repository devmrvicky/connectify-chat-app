import React from "react";
import UserProfile from "./ContactProfile";
import { useAuthContext } from "../context/AuthContext";

const AuthUserProfile = () => {
  const { authUser } = useAuthContext();
  return (
    <div>
      <span className="text-xs">login as : '{authUser?.email};</span>
      <UserProfile {...authUser} isAuthProfile={true} />
    </div>
  );
};

export default AuthUserProfile;
