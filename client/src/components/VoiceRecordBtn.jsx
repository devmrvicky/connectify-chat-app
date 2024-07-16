import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";

const VoiceRecordBtn = ({ setIsVoiceRecording }) => {
  const handleVoiceRecording = () => {
    setIsVoiceRecording(true);
    // console.log("start voice recording...");
  };

  return (
    <button
      type="button"
      className="tooltip before:bottom-12 inline-block"
      data-tip="voice message"
      onClick={handleVoiceRecording}
    >
      <CiMicrophoneOn className="w-6 h-6" />
    </button>
  );
};

export default VoiceRecordBtn;
