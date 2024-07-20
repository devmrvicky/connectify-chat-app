import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { apiGet } from "../api/api";
import { toast } from "react-hot-toast";
import { useCheckDownloadedAssets } from "../hooks/chat/useCheckDownloadedAssets";
import { FaXmark } from "react-icons/fa6";
import { SERVER_URL } from "../api/serverUrl";

const FileDownloadBtn = ({
  fileUrl,
  fileMessageId,
  className = "absolute bottom-2 left-2",
  iconSize = "w-4 h-4",
}) => {
  const [downloading, setDownloading] = useState(false);

  const { setFileToDownloadedList } = useCheckDownloadedAssets();

  const handleDownload = async () => {
    const apiUrl = `${SERVER_URL}/api/file/download?url=${fileUrl}`;
    try {
      setDownloading(true);
      const response = await fetch(apiUrl, {
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Network response was not ok", {
          id: "network-error",
        });
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileUrl.split("/").pop(); // Extracts filename from URL
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setFileToDownloadedList(fileMessageId);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        id: "file download error",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      className={`${className} flex items-center gap-1 bg-dark-bg2/50 text-light-text/80 backdrop-blur-md px-3 py-2 rounded-full z-20 `}
      onClick={handleDownload}
    >
      {!downloading ? (
        <BiDownload className={iconSize} />
      ) : (
        <>
          <span className="loading loading-spinner w-[24px]"></span>
          <FaXmark className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
        </>
      )}
      {/* <span className="text-xs">
                  {message?.size ? message?.size : "download"}
                </span> */}
    </button>
  );
};

export default FileDownloadBtn;
