import React, { useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import AudioPlayer from "../AudioPlayer";

const AudioMessage = ({ message }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const handleAudioPlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };
  return (
    <div className="audio-message w-full min-w-[200px] max-w-[250px] h-auto max-h-[300px] relative mb-0 rounded-full ">
      <AudioPlayer message={message} />
      {message.caption && (
        <span className="text-sm inline-block px-1">{message.caption}</span>
      )}
    </div>
  );
};

export default AudioMessage;
