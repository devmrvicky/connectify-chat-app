import React, { useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import useStore from "../zustand/store";

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
