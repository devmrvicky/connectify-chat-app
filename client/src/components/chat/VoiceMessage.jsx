import React, { useRef, useState } from "react";
import { BiUserVoice } from "react-icons/bi";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import FileUploadIndicator from "../FileUploadIndicator";
import FileUploadFailedIndicator from "../FileUploadFailedIndicator";
import { LiveAudioVisualizer, AudioVisualizer } from "react-audio-visualize";

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
    <div className="flex items-center gap-1 px-1 w-[200px] flex-1">
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
      <span className="flex-1 h-[2px] rounded bg-white"></span>
      <audio
        src={message.fileSrc}
        ref={voiceAudioRef}
        loop
        className="hidden"
      />
    </div>
  );
};

export default VoiceMessage;
