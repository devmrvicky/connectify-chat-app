import React from "react";
import LogoutBtn from "./LogoutBtn";

const UserProfile = ({
  fullName,
  username,
  profilePic,
  isAuthProfile = false,
}) => {
  console.log({ fullName, username, profilePic, isAuthProfile });
  return (
    <div
      className={`flex  p-1 rounded gap-4 items-center w-full ${
        isAuthProfile ? "" : "hover:bg-zinc-400/10"
      }`}
    >
      <div className="avatar">
        <div className="w-10 h-10 rounded-full">
          {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
          <img src={`${profilePic}`} />
        </div>
      </div>
      <div>
        <p className="text-lg">{fullName}</p>
        <span className="text-sm">{username}</span>
      </div>
      {isAuthProfile ? <LogoutBtn /> : ""}
    </div>
  );
};

export default UserProfile;
