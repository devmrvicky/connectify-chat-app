import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";

const VoiceRecordBtn = ({ setIsVoiceRecording, isSmallDevice }) => {
  const handleVoiceRecording = () => {
    setIsVoiceRecording(true);
    // console.log("start voice recording...");
  };

  return (
    <button
      type="button"
      className={`tooltip before:bottom-12 ${
        !isSmallDevice && "btn btn-md btn-circle"
      } flex items-center justify-center`}
      data-tip="voice message"
      onClick={handleVoiceRecording}
    >
      <CiMicrophoneOn className="w-7 h-7" />
    </button>
  );
};

export default VoiceRecordBtn;
