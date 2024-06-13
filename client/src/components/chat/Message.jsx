import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";

const Message = ({ senderId, receiverId, message, createdAt }) => {
  console.log({ senderId, receiverId, message, createdAt });
  const { authUser } = useAuthContext();
  const selectedFriend = useStore((store) => store.selectedFriend);
  const chatType = authUser._id === senderId ? "chat-end" : "chat-start";
  const profilePic =
    authUser._id === senderId ? authUser.profilePIc : selectedFriend.profilePic;
  return (
    <>
      <div className={`chat ${chatType}`}>
        <div className="chat-image avatar">
          <div className="w-6 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className="chat-bubble">{message}</div>
        <div className="chat-footer opacity-50">{createdAt}</div>
      </div>
      {/* end chat */}
      {/* <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-6 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div> */}
    </>
  );
};

export default Message;
