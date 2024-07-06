import React from "react";
import avatarIcon from "../assets/avatar-icon.png";

const Avatar = ({
  profilePic,
  isOnline = false,
  isAuthProfile = false,
  dimension = "w-10",
}) => {
  return (
    <div className={`avatar ${isOnline && !isAuthProfile ? "online" : ""}`}>
      <div className={`${dimension} rounded-full`}>
        <img
          src={profilePic}
          onError={(e) => {
            e.preventDefault();
            e.target.src = avatarIcon;
          }}
          alt="profile avatar"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
