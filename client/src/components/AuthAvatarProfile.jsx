import React from "react";
import PopoverDemo from "./radix-ui/Popover";
import { useAuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";

const AuthAvatarProfile = () => {
  const { authUser } = useAuthContext();
  return (
    <PopoverDemo>
      <button className="tooltip" data-tip={`${authUser?.fullName}`}>
        <Avatar profilePic={authUser?.profilePic} />
      </button>
    </PopoverDemo>
  );
};

export default AuthAvatarProfile;
