import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore, { useFriendStore } from "../../zustand/store";
import receiveMsgSound from "../../assets/sound/receive-msg.mp3";
import newNotificationSound from "../../assets/sound/new-notification.mp3";
import toast from "react-hot-toast";
import MessageToast from "../../components/MessageToast";

// this hook called by home component
const useListMessages = () => {
  const { socket } = useSocketContext();
  const {
    addMessage,
    removeMessage,
    selectedFriend,
    messages,
    addUnreadMessage,
  } = useStore((store) => store);
  const { myContacts } = useFriendStore((store) => store);

  useEffect(() => {
    const updateNewMessage = async ({ message }) => {
      if (message.senderId === selectedFriend?._id) {
        addMessage(message);
        // if message type is img then set message id to localStorage as
        const audio = new Audio(receiveMsgSound);
        await audio.play();
      } else {
        console.log(message);
        addUnreadMessage(message);
        const audio = new Audio(newNotificationSound);
        await audio.play();
      }
    };
    socket?.on("newMessage", updateNewMessage);

    // delete chat
    const deleteMessage = async ({ messageId, remoteUserId }) => {
      if (selectedFriend?._id === remoteUserId) {
        console.log({ messageId, remoteUserId });
        removeMessage(messageId);
      }
    };
    socket?.on("deleteMessage", deleteMessage);

    return () => {
      socket?.off("newMessage", updateNewMessage);
      socket?.off("deleteMessage", deleteMessage);
    };
  }, [socket, selectedFriend?._id, messages.length]);
};

export default useListMessages;
