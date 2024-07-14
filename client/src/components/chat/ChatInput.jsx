import React, { useEffect, useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendChat from "../../hooks/chat/useSendChat";
import { VscLoading } from "react-icons/vsc";
import useGetTypingStatus from "../../hooks/chat/useGetTypingStatus";
import { LuFolderSymlink } from "react-icons/lu";
import { PopoverContent } from "../radix-ui/Popover";
import FileShareBtns from "../FileShareBtns";
import FileSendWindow from "../FileSendWindow";
import imageCompression from "browser-image-compression";

const ChatInput = () => {
  const [file, setFile] = useState("");
  const [isFileChooses, setIsFileChooses] = useState(false);
  const [fileObj, setFileObj] = useState(null);

  const [isInput, setIsInput] = useState(false);
  const [chat, setChat] = useState("");
  const chatInputRef = useRef(null);
  const { sendChat, loading } = useSendChat();
  const { sendTypingStatus } = useGetTypingStatus();

  const imgFileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    chatInputRef.current.focus();
    if (!chat) return;
    sendChat({ message: chat, type: "text" });
    setChat("");
  };

  async function compressImg(imgFile) {
    console.log("originalFile instanceof Blob", imgFile instanceof Blob); // true
    console.log(`originalFile size ${imgFile.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 1 / 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imgFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChooseFile(e) {
    try {
      let file = e.target.files[0];
      console.log(file); // File {name: 'WhatsApp Image 2024-07-14 at 09.13.58_228cc5d7.jpg', lastModified: 1720933524640, lastModifiedDate: Sun Jul 14 2024 10:35:24 GMT+0530 (India Standard Time), webkitRelativePath: '', size: 1391, type: "image/jpeg", webkitRelativePath: ""}

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
    <form
      className="max-w-[900px] w-full mx-auto my-auto"
      onSubmit={handleSubmit}
    >
      <label className="input input-bordered flex items-center gap-3 max-[420px]:gap-0 rounded-full bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2">
        {isFileChooses && (
          <FileSendWindow
            {...fileObj}
            closeWindow={closeFileShareWindow}
            file={file}
          />
        )}
        <button
          type="button"
          className="tooltip before:bottom-12"
          // data-tip="voice message"
        >
          <CiMicrophoneOn className="w-6 h-6" />
        </button>
        <PopoverContent>
          <LuFolderSymlink className="w-5 h-5" />
          <form action="post" enctype="multipart/form-data" ref={imgFileRef}>
            <FileShareBtns handleOnChange={handleChooseFile} />
          </form>
        </PopoverContent>
        <input
          type="text"
          className="grow"
          placeholder="Write something"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          ref={chatInputRef}
        />
        <button
          type="submit"
          disabled={loading}
          className="tooltip before:bottom-12"
          data-tip="send"
        >
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
