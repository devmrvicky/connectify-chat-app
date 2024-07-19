import { useState } from "react";
import useStore from "../../zustand/store";

const useMedia = () => {
  const { messages } = useStore((store) => store);
  const mediaFiles = messages.filter((message) =>
    ["image", "video", "audio"].includes(message.type)
  );
  const [currentFile, setCurrentFile] = useState(mediaFiles[0]);

  const chooseCurrentMediaFile = (fileId) => {
    console.log(fileId);
    setCurrentFile(mediaFiles.find((file) => file._id === fileId));
  };

  return { mediaFiles, currentFile, chooseCurrentMediaFile };
};

export { useMedia };
