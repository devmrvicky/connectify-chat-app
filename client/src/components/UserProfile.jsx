import React, { useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import useStore from "../zustand/store";
import { useSocketContext } from "../context/SocketContext";

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
  console.log(onlineUsers);

  const isOnline = onlineUsers.find((user) => user === _id);

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
      <div className={`avatar ${isOnline ? "online" : "offline"}`}>
        <div className="w-10 h-10 rounded-full">
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
