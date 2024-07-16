import { PauseIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { BiPause, BiTrashAlt } from "react-icons/bi";
import { CiTrash, CiPause1, CiPlay1 } from "react-icons/ci";
import { MdVoiceChat, MdKeyboardVoice } from "react-icons/md";
import AudioPlayer from "./AudioPlayer";
import { useRecording } from "../hooks/recording/useRecording";
import useSendChat from "../hooks/chat/useSendChat";
import { RiSendPlaneFill } from "react-icons/ri";
import { formatMinutes, formatSeconds } from "../utils/formateTime";
import { LiveAudioVisualizer } from "react-audio-visualize";

const VoiceRecording = ({ setIsVoiceRecording }) => {
  const [isRecordingPause, setIsRecordingPause] = useState(false);
  const [isRecordingPlaying, setIsRecordingPlaying] = useState(false);

  const recordingRef = useRef(null);

  const { mediaRecorder, audioUrl, file, recordingTime } = useRecording();
  const { sendChat } = useSendChat();

  const handlePlayPauseRecording = () => {
    if (isRecordingPause) {
      // play recording
      if (recordingRef?.current.paused) {
        recordingRef?.current.play();
        setIsRecordingPlaying(true);
      } else {
        recordingRef?.current.pause();
        setIsRecordingPlaying(false);
      }
    } else {
      // pause recording
      if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
      }
      setIsRecordingPause(true);
    }
  };

  const handleRecordingResume = () => {
    if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsRecordingPause(false);
      setIsRecordingPlaying(false);
    }
  };

  const handleStopRecording = () => {
    setIsVoiceRecording(false);
    mediaRecorder.stop();
  };

  const handleSendVoiceRecorder = () => {
    setIsVoiceRecording(false);
    mediaRecorder.stop();
    sendChat({ file, fileSrc: audioUrl, type: "voice" });
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <button
        type="button"
        className="tooltip before:bottom-12"
        data-tip="discard voice message"
        onClick={handleStopRecording}
      >
        <CiTrash className="w-6 h-6 text-red-600" />
      </button>
      {isRecordingPause ? (
        <button
          type="button"
          className="tooltip before:bottom-12"
          data-tip="resume voice recording"
          onClick={handleRecordingResume}
        >
          <MdKeyboardVoice className="w-6 h-6 text-red-400" />
        </button>
      ) : (
        <span
          className="indicator w-3 h-3 rounded-full bg-red-800 animate-pulse tooltip before:bottom-12"
          data-tip="recording..."
        ></span>
      )}
      <span className="recording-duration">
        {formatMinutes(recordingTime.minutes)}:
        {formatSeconds(recordingTime.seconds)}
      </span>
      {!isRecordingPause ? (
        mediaRecorder ? (
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            // width={200}
            // height={75}
          />
        ) : (
          <span className="w-full flex-1 h-[2px] rounded bg-white"></span>
        )
      ) : (
        <audio
          src={audioUrl}
          // controls

          className="w-full flex-1"
          ref={recordingRef}
        />
        //  {/* <AudioPlayer message={{ fileName: "v001", fileSrc: audioUrl }} /> */}
      )}
      <PlayPauseBtn
        isRecordingPause={isRecordingPause}
        isRecordingPlaying={isRecordingPlaying}
        handlePlayPauseRecording={handlePlayPauseRecording}
      />
      <button
        type="button"
        className="tooltip before:bottom-12"
        data-tip="send"
        onClick={handleSendVoiceRecorder}
      >
        <RiSendPlaneFill className="w-6 h-6" />
      </button>
    </div>
  );
};

const PlayPauseBtn = ({
  isRecordingPause,
  isRecordingPlaying,
  handlePlayPauseRecording,
}) => {
  return (
    <button
      type="button"
      className="tooltip before:bottom-12"
      data-tip={
        isRecordingPlaying ? "play voice recording" : "pause voice recording"
      }
      onClick={handlePlayPauseRecording}
    >
      {isRecordingPause ? (
        isRecordingPlaying ? (
          <CiPause1 className="w-6 h-6" />
        ) : (
          <CiPlay1 className="w-6 h-6" />
        )
      ) : (
        <CiPause1 className="w-6 h-6" />
      )}
    </button>
  );
};

export default VoiceRecording;
