import React from "react";
import avatarIcon from "../../assets/avatar-icon.png";
import { HiOutlineUserRemove } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";

const FriendProfile = ({
  profilePic,
  fullName,
  username,
  isFriend = false,
}) => {
  return (
    <div
      className={`flex  p-4 rounded gap-4 items-center w-full hover:bg-zinc-400/10`}
    >
      <div className={`avatar`}>
        <div className="w-14 h-14 rounded-full">
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
        <p className="text-xl flex items-center gap-1">
          <span>{fullName}</span>
          {isFriend && (
            <span
              className="badge badge-accent text-[10px] tooltip"
              data-tip="friend"
            >
              friend
            </span>
          )}
        </p>
        <span className="text-lg text-zinc-400">{username}</span>
      </div>
      <div className="btns flex items-center gap-2">
        <button className="btn btn-secondary tooltip" data-tip="remove">
          <HiOutlineUserRemove className="w-6 h-6" />
        </button>
        {!isFriend && (
          <button className="btn btn-primary tooltip" data-tip="add">
            <HiOutlineUserAdd className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendProfile;
