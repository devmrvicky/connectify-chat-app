import React from "react";
import avatarIcon from "../../assets/avatar-icon.png";
import { HiOutlineUserRemove } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useFriendRequest } from "../../hooks/friend/useFriendRequest";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserUnfollow } from "react-icons/sl";
import Avatar from "../../components/Avatar";

// this is most complex and confusing component because is is handling more conditions
// controller buttons for deferent conditions will be deferent deferent like for
// if users are friend then show only 'remove' button
// if users are in friend request then show 'accept' and 'reject' button
// if users are in send friend request then show 'remove'
const FriendProfile = ({
  _id,
  profilePic,
  fullName,
  username,
  isFriend = false,
  isFriendRequest = false,
  isSendFriendRequest = false,
}) => {
  const {
    sendingRequest,
    sendFriendRequest,
    acceptingRequest,
    acceptFriendRequest,
    removingRequest,
    removeFriendRequest,
  } = useFriendRequest();

  return (
    <div
      className={`flex  p-4 rounded gap-4 items-center w-full hover:bg-zinc-400/10`}
    >
      <Avatar profilePic={profilePic} dimension="w-14 h-14" />
      {/* <div className={`avatar`}>
        <div className="w-14 h-14 rounded-full">
          <img
            src={`${profilePic}`}
            onError={(e) => {
              e.preventDefault();
              e.target.src = avatarIcon;
            }}
          />
        </div>
      </div> */}
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
          {isSendFriendRequest && (
            <span
              className="badge badge-accent text-[10px] tooltip"
              data-tip="pending"
            >
              pending
            </span>
          )}
        </p>
        <span className="text-lg text-zinc-400">{username}</span>
      </div>
      <div className="btns flex items-center gap-2">
        {!isFriendRequest ? (
          <>
            <button
              className="btn btn-secondary tooltip"
              data-tip="remove"
              disabled={removingRequest}
              onClick={() =>
                removeFriendRequest(
                  _id,
                  isFriend ? "remove-my-friend" : "remove-friend-request"
                )
              }
            >
              <HiOutlineUserRemove className="w-6 h-6" />
            </button>
            {(!isFriend || isSendFriendRequest) && (
              <button
                className="btn btn-primary tooltip"
                data-tip="add"
                onClick={() => sendFriendRequest(_id)}
                disabled={sendingRequest}
              >
                {sendingRequest ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <HiOutlineUserAdd className="w-6 h-6" />
                )}
              </button>
            )}
          </>
        ) : (
          <>
            <button
              className="btn btn-secondary tooltip"
              data-tip="reject"
              onClick={() => removeFriendRequest(_id, "reject-friend-request")}
              disabled={removingRequest}
            >
              {removingRequest ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <SlUserUnfollow className="w-6 h-6" />
              )}
            </button>
            <button
              className="btn btn-success tooltip"
              data-tip="accept"
              onClick={() => acceptFriendRequest(_id)}
              disabled={acceptingRequest}
            >
              {acceptingRequest ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <SlUserFollowing className="w-6 h-6" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendProfile;
