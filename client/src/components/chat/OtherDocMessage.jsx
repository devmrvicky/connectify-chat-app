import FileUploadIndicator from "../FileUploadIndicator";
import FileUploadFailedIndicator from "../FileUploadFailedIndicator";
import FileDownloadBtn from "../FileDownloadBtn";
import { useAuthContext } from "../../context/AuthContext";
import { IoDocument } from "react-icons/io5";

const OtherDocMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="btn w-14 h-14 p-0 rounded-full flex items-center justify-center relative overflow-hidden">
          {message?.status === "pending" ? (
            <FileUploadIndicator />
          ) : message?.status === "failed" ? (
            <FileUploadFailedIndicator />
          ) : (
            <IoDocument className="w-8 h-8" />
          )}
          {/* {} */}
        </div>
        <div className="overflow-hidden flex items-center gap-2">
          <span className="text-sm">
            {message.fileName}.{message.fileSrc.split(".").at(-1)}
          </span>
          {message?.status === "success" &&
            authUser?._id !== message.senderId && (
              <FileDownloadBtn
                fileUrl={message?.fileSrc}
                fileMessageId={message._id}
                className="relative"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default OtherDocMessage;
