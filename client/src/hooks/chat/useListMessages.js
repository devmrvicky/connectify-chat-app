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
  const { addMessage, selectedFriend, messages, addUnreadMessage } = useStore(
    (store) => store
  );
  const { myContacts } = useFriendStore((store) => store);

  useEffect(() => {
    const updateNewMessage = async ({ message }) => {
      if (message.senderId === selectedFriend?._id) {
        addMessage(message);
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

    return () => {
      socket?.off("newMessage", updateNewMessage);
    };
  }, [socket, selectedFriend?._id, messages.length]);
};

export default useListMessages;
