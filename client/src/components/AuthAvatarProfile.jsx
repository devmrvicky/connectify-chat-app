import React from "react";
import PopoverDemo from "./radix-ui/Popover";
import { useAuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";
import AuthUserProfile from "./AuthUserProfile";
import ProfileSetting from "./settings/ProfileSetting";
import AccountSetting from "./settings/AccountSetting";
import ThemeController from "./radix-ui/ThemeController";
import LogoutBtn from "./LogoutBtn";

const AuthAvatarProfile = () => {
  const { authUser } = useAuthContext();
  return (
    <PopoverDemo>
      <button className="tooltip" data-tip={`${authUser?.fullName}`}>
        <Avatar profilePic={authUser?.profilePic} />
      </button>
      <div>
        <AuthUserProfile />
        <div className="divider my-2 divider-start">
          <span className="text-sm">settings</span>
        </div>
        <ProfileSetting />
        <AccountSetting />
        <div className="divider my-2 divider-start">
          <span className="text-sm">options</span>
        </div>
        <ThemeController />
        <div className="divider m-0"></div>
        <div className="flex justify-between w-full p-2">
          <span>Logout</span>
          <LogoutBtn />
        </div>
      </div>
    </PopoverDemo>
  );
};

export default AuthAvatarProfile;
