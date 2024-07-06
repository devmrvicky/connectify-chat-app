import React, { useEffect, useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendChat from "../../hooks/chat/useSendChat";
import { VscLoading } from "react-icons/vsc";
import useGetTypingStatus from "../../hooks/chat/useGetTypingStatus";

const ChatInput = () => {
  const [isInput, setIsInput] = useState(false);
  const [chat, setChat] = useState("");
  const chatInputRef = useRef(null);
  const { sendChat, loading } = useSendChat();
  const { sendTypingStatus } = useGetTypingStatus();

  const handleSubmit = (e) => {
    e.preventDefault();
    chatInputRef.current.focus();
    if (!chat) return;
    sendChat(chat);
    setChat("");
  };

  let timeoutId;
  // this useEffect will run on every change on chat input
  // send typing status 'true' when user starts writing in chat input
  // after 2 second when user stops writing in chat input send again typing status 'false'
  // in both case server send your typing status as res to end user
  // this will not cause of rat condition because we have handle rat condition care fully
  useEffect(() => {
    (async () => {
      clearTimeout(timeoutId);
      if (!isInput && chat) {
        setIsInput(true);
        await sendTypingStatus(true);
        console.log("typing");
      }
      timeoutId = setTimeout(async () => {
        if (isInput) {
          setIsInput(false);
          await sendTypingStatus(false);
          console.log("typing stopped");
        }
      }, 2000);
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [chat]);

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
