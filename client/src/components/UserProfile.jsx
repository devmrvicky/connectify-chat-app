import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import useStore from "../zustand/store";
import { useSocketContext } from "../context/SocketContext";
import avatarIcon from "../assets/avatar-icon.png";
import { formatDistance, subDays } from "date-fns";
import { apiGet } from "../api/api";

const UserProfile = ({
  fullName,
  username,
  profilePic,
  gender,
  _id,
  isAuthProfile = false,
}) => {
  const [lastChat, setLastChat] = useState(null);

  const { selectFriend, selectedFriend, messages, lastConversation } = useStore(
    (store) => store
  );

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);

  const handleSelectFriend = () => {
    if (isAuthProfile) return;
    selectFriend({ fullName, username, profilePic, gender, _id });
  };

  useEffect(() => {
    (async () => {
      const data = await apiGet(`messages/${_id}`);
      if (!data.status) {
        toast.error(data.message);
        throw new Error(data.message);
      }

      if (lastConversation && lastConversation.receiverId === _id) {
        setLastChat(lastConversation);
      } else {
        setLastChat(data.lastMessage);
      }
    })();
  }, [messages.length, lastConversation, lastConversation?.message]);

  useEffect(() => {
    return () => selectFriend(null);
  }, []);

  return (
    <div
      className={`flex  p-2 rounded gap-4 items-center w-full cursor-pointer ${
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
      <div className="w-full flex flex-col gap-0">
        <p className="text-lg">{fullName}</p>
        {!isAuthProfile ? (
          <div className="flex justify-between items-center w-full text-sm">
            <p className="last-chat flex gap-1">
              <span>
                {lastChat?.message && lastChat?.receiverId === _id && "you : "}
              </span>
              <span>{lastChat?.message}</span>
            </p>
            <p className="ml-auto">
              {lastChat?.updatedAt &&
                formatDistance(subDays(lastChat?.updatedAt, 0), new Date(), {
                  addSuffix: true,
                })}
            </p>
          </div>
        ) : (
          <span className="text-xs">{username}</span>
        )}
      </div>
      {/* {isAuthProfile ? <LogoutBtn /> : ""} */}
    </div>
  );
};

export default UserProfile;
