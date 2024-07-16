import React, { useRef, useState } from "react";
import { BiUserVoice } from "react-icons/bi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import FileUploadIndicator from "../FileUploadIndicator";
import FileUploadFailedIndicator from "../FileUploadFailedIndicator";

const VoiceMessage = ({ message }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const voiceAudioRef = useRef(null);

  const handleAudioPlay = () => {
    if (voiceAudioRef?.current.paused) {
      voiceAudioRef?.current.play();
      setIsAudioPlaying(true);
    } else {
      voiceAudioRef?.current.pause();
      setIsAudioPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-2 px-2 w-[300px]">
      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative">
        {message?.status === "pending" ? (
          <FileUploadIndicator />
        ) : message?.status === "failed" ? (
          <FileUploadFailedIndicator />
        ) : (
          <BiUserVoice className="w-6 h-6" />
        )}
      </div>
      <button
        type="button"
        className="tooltip before:bottom-12"
        data-tip={isAudioPlaying ? "play audio" : "pause audio"}
        onClick={handleAudioPlay}
      >
        {!isAudioPlaying ? (
          <CiPlay1 className="w-6 h-6" />
        ) : (
          <CiPause1 className="w-6 h-6" />
        )}
      </button>
      <span className="w-full flex-1 h-[2px] rounded bg-white"></span>
      <audio
        src={message.fileSrc}
        ref={voiceAudioRef}
        controls
        className="hidden"
      />
    </div>
  );
};

export default VoiceMessage;
