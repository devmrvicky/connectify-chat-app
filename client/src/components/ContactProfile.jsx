import React, { useCallback, useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useSocketContext } from "../context/SocketContext";
import { formatDistance, subDays } from "date-fns";
import { apiGet } from "../api/api";
import Avatar from "./Avatar";

const ContactProfile = ({
  fullName,
  username,
  profilePic,
  gender,
  _id,
  isAuthProfile = false,
}) => {
  const [lastChat, setLastChat] = useState(null);

  const {
    selectFriend,
    selectedFriend,
    messages,
    unreadMessages,
    removeAllUnreadMessages,
  } = useStore((store) => store);

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);

  const unreadMessage = useCallback(
    unreadMessages.filter((unreadMessage) => unreadMessage.senderId === _id),
    [unreadMessages]
  );
  console.log({ unreadMessage });

  const handleSelectFriend = () => {
    if (isAuthProfile) return;
    selectFriend({ fullName, username, profilePic, gender, _id });
    removeAllUnreadMessages(_id);
  };

  useEffect(() => {
    (async () => {
      const data = await apiGet(`messages/${_id}`);
      if (!data.status) {
        toast.error(data.message);
        throw new Error(data.message);
      }

      // console.log({ lastMessage: data.lastMessage });
      // this last chat is showing on contact profile
      // if user have unread messages then user's last is last message from unread messages
      if (unreadMessage.length) {
        setLastChat(unreadMessage[unreadMessage.length - 1]);
      } else {
        setLastChat(data.lastMessage);
      }
    })();
  }, [messages.length, unreadMessage]);

  useEffect(() => {
    return () => selectFriend(null);
  }, []);

  return (
    <div
      className={`contact-profile flex  p-2 rounded gap-4 items-center w-full cursor-pointer ${
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
      <Avatar
        profilePic={profilePic}
        isOnline={isOnline}
        isAuthProfile={isAuthProfile}
      />
      <div className="w-full flex flex-col gap-0">
        <div className=" flex justify-between items-center">
          <p className="text-lg">{fullName}</p>
          {Boolean(unreadMessage.length) && (
            <span
              className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center tooltip"
              data-tip={`${unreadMessage.length} unread message`}
            >
              {unreadMessage.length}
            </span>
          )}
        </div>
        {!isAuthProfile ? (
          <>
            <div className="flex justify-between items-center w-full text-sm">
              <p className="last-chat flex gap-1">
                <span>
                  {lastChat?.message &&
                    lastChat?.receiverId === _id &&
                    "you : "}
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
            {/* selectedFriend?._id === _id ? (
            <div className="flex justify-between items-center w-full text-sm">
              <p className="last-chat flex gap-1">
                <span>
                  {lastChat?.message &&
                    lastChat?.receiverId === _id &&
                    "you : "}
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
            <div className="flex justify-between items-center w-full text-sm">
              <p className="last-chat flex gap-1">
                <span>
                  {lastChat?.message &&
                    lastChat?.receiverId === _id &&
                    "you : "}
                </span>
                <span>{unreadMessage[unreadMessage.length - 1]?.message}</span>
              </p>
              <p className="ml-auto">
                <span>
                  {unreadMessage[unreadMessage.length - 1]?.updatedAt &&
                    formatDistance(
                      subDays(
                        unreadMessage[unreadMessage.length - 1]?.updatedAt,
                        0
                      ),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                </span>
              </p>
            </div>
          ) */}
          </>
        ) : (
          <span className="text-xs">{username}</span>
        )}
      </div>
    </div>
  );
};

export default ContactProfile;
