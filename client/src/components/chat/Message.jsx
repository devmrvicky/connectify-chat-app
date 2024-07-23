import { useAuthContext } from "../../context/AuthContext";
import useStore from "../../zustand/store";
import { format, formatDistanceToNow } from "date-fns";
import avatarIcon from "../../assets/avatar-icon.png";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";
import { useMediaQuery } from "@uidotdev/usehooks";
import ImgMessage from "./ImgMessage";
import VideoMessage from "./VideoMessage";
import AudioMessage from "./AudioMessage";
import OtherDocMessage from "./OtherDocMessage";
import VoiceMessage from "./VoiceMessage";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../../hooks/media/useMedia";
import ContextMenu from "../radix-ui/ContextMenu";

// here message will be display according to message type (text, image, video, audio)

const Message = ({ lastMessageRef, message }) => {
  const { authUser } = useAuthContext();
  const { selectedFriend, setOpenMediaGallery } = useStore((store) => store);

  const navigate = useNavigate();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const chatType =
    authUser?._id === message.senderId ? "chat-end" : "chat-start";
  const profilePic =
    authUser?._id === message.senderId
      ? authUser.profilePic
      : selectedFriend.profilePic;

  const { chooseCurrentMediaFile } = useMedia();

  const handleOpenMediaFile = ({ fileType, fileId }) => {
    if (["text", "voice"].includes(fileType)) return;
    chooseCurrentMediaFile(fileId);
    setOpenMediaGallery(true);
  };

  return (
    <ContextMenu publicId={message?.publicId} messageId={message._id} remoteUserId={selectedFriend?._id}>
      <div className={`chat ${chatType}`} ref={lastMessageRef}>
        {!isSmallDevice && (
          <div className="chat-image avatar">
            <div className="w-6 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={profilePic}
                onError={(e) => (e.target.src = avatarIcon)}
              />
            </div>
          </div>
        )}
        <div
          className={`chat-bubble ${
            message.type !== "text" ? "p-1 rounded-sm" : ""
          } bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2 flex flex-col relative`}
          onClick={() =>
            handleOpenMediaFile({ fileType: message.type, fileId: message._id })
          }
        >
          {/* text */}
          {message.type === "text" && (
            <span className="break-words">{message.message}</span>
          )}
          {/* image */}
          {message.type === "image" && <ImgMessage message={message} />}
          {/* video */}
          {message.type === "video" && <VideoMessage message={message} />}
          {/* audio */}
          {message.type === "audio" && <AudioMessage message={message} />}
          {message.type === "application" && (
            <OtherDocMessage message={message} />
          )}
          {message.type === "voice" && <VoiceMessage message={message} />}
          <span
            className={`text-[10px] ml-auto text-zinc-500 flex items-center ${
              ["image", "video"].includes(message.type) &&
              !message.caption &&
              "absolute z-10 bottom-2 right-2 text-light-text bg-dark-bg22/50 backdrop-blur-md px-2 py-1 rounded-full"
            }`}
          >
            {format(message.createdAt, "hh:mm aa")}
            {["pending", "failed"].includes(message?.status) &&
              message?.senderId === authUser?._id && (
                <MdOutlineWatchLater className="ml-[4px] w-3 h-3" />
              )}
            {message?.status === "success" &&
              message?.senderId === authUser?._id && (
                <BiCheckDouble className="ml-[4px] w-4 h-4" />
              )}
          </span>
        </div>
        <div className="chat-footer opacity-50">
          {formatDistanceToNow(message.createdAt)}
        </div>
      </div>
    </ContextMenu>
  );
};

export default Message;
