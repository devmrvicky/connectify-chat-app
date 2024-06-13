import React, { useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendChat from "../../hooks/chat/useSendChat";
import { VscLoading } from "react-icons/vsc";

const ChatInput = () => {
  const [chat, setChat] = useState("");
  const chatInputRef = useRef(null);
  const { sendChat, loading } = useSendChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    chatInputRef.current.focus();
    if (!chat) return;
    sendChat(chat);
    setChat("");
  };

  return (
    <form className="max-w-[900px] w-full mx-auto" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2 rounded-full">
        <CiMicrophoneOn className="w-6 h-6" />
        <input
          type="text"
          className="grow"
          placeholder="Write something"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          ref={chatInputRef}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <VscLoading className="w-6 h-6 animate-spin" />
          ) : (
            <RiSendPlaneFill className="w-6 h-6" />
          )}
        </button>
      </label>
    </form>
  );
};

export default ChatInput;
