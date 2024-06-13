import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatInput = () => {
  return (
    <form className="max-w-[900px] w-full mx-auto">
      <label className="input input-bordered flex items-center gap-2 rounded-full">
        <CiMicrophoneOn className="w-6 h-6" />
        <input type="text" className="grow" placeholder="Write something" />
        <button type="submit">
          <RiSendPlaneFill className="w-6 h-6" />
        </button>
      </label>
    </form>
  );
};

export default ChatInput;
