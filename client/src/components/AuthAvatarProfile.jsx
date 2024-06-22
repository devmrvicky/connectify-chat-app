import React from "react";
import PopoverDemo from "./radix-ui/Popover";
import avatarIcon from "../assets/avatar-icon.png";
import { useAuthContext } from "../context/AuthContext";

const AuthAvatarProfile = () => {
  const { authUser } = useAuthContext();
  return (
    <PopoverDemo>
      <button>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={authUser?.profilePic}
              onError={(e) => {
                e.preventDefault();
                e.target.src = avatarIcon;
              }}
            />
          </div>
        </div>
      </button>
    </PopoverDemo>
  );
};

export default AuthAvatarProfile;
