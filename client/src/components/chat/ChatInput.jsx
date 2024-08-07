import React, { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendChat from "../../hooks/chat/useSendChat";
import { VscLoading } from "react-icons/vsc";
import useGetTypingStatus from "../../hooks/chat/useGetTypingStatus";
import { LuFolderSymlink } from "react-icons/lu";
import { PopoverContent } from "../radix-ui/Popover";
import FileShareBtns from "../FileShareBtns";
import FileSendWindow from "../FileSendWindow";
import VoiceRecordBtn from "../VoiceRecordBtn";
import VoiceRecording from "../VoiceRecording";
import OpenCameraBtn from "../camera/OpenCameraBtn";
import { compressImg } from "../../utils/compressImg";
import { BsFolderSymlink } from "react-icons/bs";
import { useMediaQuery } from "@uidotdev/usehooks";

const ChatInput = () => {
  const [file, setFile] = useState("");
  const [isFileChooses, setIsFileChooses] = useState(false);
  const [fileObj, setFileObj] = useState(null);

  const [isChatInputFocused, setIsChatInputFocused] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [chat, setChat] = useState("");

  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  const chatInputRef = useRef(null);
  const { sendChat, loading } = useSendChat();
  const { sendTypingStatus } = useGetTypingStatus();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 540px)");

  const handleSubmit = (e) => {
    e.preventDefault();
    chatInputRef.current.focus();
    if (!chat) return;
    sendChat({ message: chat, type: "text" });
    setChat("");
  };

  async function handleChooseFile(e) {
    try {
      let file = e.target.files[0];
      // console.log(file); // File {name: 'WhatsApp Image 2024-07-14 at 09.13.58_228cc5d7.jpg', lastModified: 1720933524640, lastModifiedDate: Sun Jul 14 2024 10:35:24 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 1391, type: "image/jpeg", webkitRelativePath: ""}

      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        file = await compressImg(file);
      }
      setFile(file);

      // console.log(file); // Blob {name: 'warm-brown-and-cold-colour-palettes.jpg', lastModified: 1720412425444, size: 205705, type: 'image/jpeg'}

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setIsFileChooses(true);
      reader.onload = () => {
        setFileObj({
          src: reader.result,
          name: file.name,
          size: file.size,
          fileType,
        });
      };
    } catch (error) {
      console.log(error);
    }
  }

  const closeFileShareWindow = () => {
    console.log("window close");
    setIsFileChooses(false);
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
    <div
      className={`flex items-center gap-1  ${
        isSmallDevice &&
        "border input-bordered rounded-full bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2 overflow-hidden pl-3"
      }`}
    >
      {!isChatInputFocused && !isVoiceRecording && (
        <div
          className={`flex items-center ${isSmallDevice ? "gap-1" : "gap-1"}`}
        >
          <VoiceRecordBtn
            setIsVoiceRecording={setIsVoiceRecording}
            isSmallDevice={isSmallDevice}
          />
          <OpenCameraBtn isSmallDevice={isSmallDevice}>
            <CiCamera className="w-6 h-6" />
          </OpenCameraBtn>
          <PopoverContent
            tooltip="tooltip before:bottom-12"
            tipStr="file share"
            triggerBtnClass={`${
              !isSmallDevice && "btn btn-md"
            } btn-circle flex items-center justify-center`}
          >
            <BsFolderSymlink className="w-6 h-6 mx-1" />
            {/* <LuFolderSymlink className="w-6 h-6 mx-1" /> */}
            <FileShareBtns handleOnChange={handleChooseFile} />
          </PopoverContent>
        </div>
      )}
      <form
        className="max-w-[900px] w-full mx-auto my-auto"
        onSubmit={handleSubmit}
      >
        <div
          className={`input bg-transparent focus-within:outline-none focus-within:border-0 max-[540px]:p-0 flex items-center gap-3 max-[420px]:gap-0 ${
            !isSmallDevice &&
            " input-bordered rounded-full bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2"
          }`}
        >
          {isFileChooses && (
            <FileSendWindow
              {...fileObj}
              closeWindow={closeFileShareWindow}
              file={file}
            />
          )}
          {isVoiceRecording ? (
            <VoiceRecording setIsVoiceRecording={setIsVoiceRecording} />
          ) : (
            <>
              <input
                type="text"
                className="grow focus:outline-none dark:text-light-text2 text-dark-text2 placeholder"
                placeholder="Write something"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                ref={chatInputRef}
                onFocus={() => setIsChatInputFocused(true)}
                onBlur={() => setIsChatInputFocused(false)}
              />

              <button
                type="submit"
                disabled={loading}
                className="tooltip before:bottom-12 ml-auto"
                data-tip="send"
              >
                {loading ? (
                  <VscLoading className="w-7 h-7 animate-spin" />
                ) : (
                  <RiSendPlaneFill className="w-7 h-7" />
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
