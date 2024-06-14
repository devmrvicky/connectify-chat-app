import React, { useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import useStore from "../zustand/store";
import { useSocketContext } from "../context/SocketContext";
import avatarIcon from "../assets/avatar-icon.png";

const UserProfile = ({
  fullName,
  username,
  profilePic,
  gender,
  _id,
  isAuthProfile = false,
}) => {
  const { selectFriend, selectedFriend } = useStore((store) => ({
    selectFriend: store.selectFriend,
    selectedFriend: store.selectedFriend,
  }));

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);

  const handleSelectFriend = () => {
    if (isAuthProfile) return;
    selectFriend({ fullName, username, profilePic, gender, _id });
  };

  useEffect(() => {
    return () => selectFriend(null);
  }, []);

  return (
    <div
      className={`flex  p-1 rounded gap-4 items-center w-full ${
        isAuthProfile
          ? ""
          : `${
              selectedFriend?._id === _id
                ? "bg-zinc-400/10 hover:bg-zinc-400/10"
                : "hover:bg-zinc-400/10"
            }`
      }`}
      onClick={handleSelectFriend}
    >
      <div className={`avatar ${isOnline && !isAuthProfile ? "online" : ""}`}>
        <div className="w-10 h-10 rounded-full">
          <img
            src={`${profilePic}`}
            onError={(e) => {
              e.preventDefault();
              e.target.src = avatarIcon;
            }}
          />
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
