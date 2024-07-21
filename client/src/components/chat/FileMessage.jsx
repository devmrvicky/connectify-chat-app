import React from "react";
import FileUploadIndicator from "../FileUploadIndicator";
import FileUploadFailedIndicator from "../FileUploadFailedIndicator";
import { useCheckDownloadedAssets } from "../../hooks/chat/useCheckDownloadedAssets";
import { useAuthContext } from "../../context/AuthContext";
import FileDownloadBtn from "../FileDownloadBtn";

const FileMessage = ({ children, message, className = "" }) => {
  const { downloadedAssets } = useCheckDownloadedAssets();

  const isDownloadedAsset = downloadedAssets.includes(message._id);
  const { authUser } = useAuthContext();
  return (
    <div
      className={`w-full min-w-[200px] max-w-[250px] max-h-[300px] relative mb-0 rounded-l-sm overflow-hidden ${className}`}
    >
      {message?.status === "pending" && <FileUploadIndicator />}
      {message?.status === "failed" && <FileUploadFailedIndicator />}
      {!isDownloadedAsset && message?.senderId !== authUser?._id && (
        <FileDownloadBtn
          fileUrl={message?.fileSrc}
          fileMessageId={message._id}
        />
      )}
      {children}
      {message.caption && (
        <span className="text-sm inline-block px-1">{message.caption}</span>
      )}
    </div>
  );
};

export default FileMessage;
