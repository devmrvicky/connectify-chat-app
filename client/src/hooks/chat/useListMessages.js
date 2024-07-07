import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";
import receiveMsgSound from "../../assets/sound/receive-msg.mp3";
import { useAuthContext } from "../../context/AuthContext";

// this hook called by home component
const useListMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage, selectedFriend, messages, addUnreadMessage } = useStore(
    (store) => store
  );

  const { authUser } = useAuthContext();

  useEffect(() => {
    const updateNewMessage = async ({ message }) => {
      if (message.senderId === selectedFriend?._id) {
        addMessage(message);
        const audio = new Audio(receiveMsgSound);
        await audio.play();
      } else {
        console.log(message);
        addUnreadMessage(message);
      }
    };
    socket?.on("newMessage", updateNewMessage);

    return () => {
      socket?.off("newMessage", updateNewMessage);
    };
  }, [socket, selectedFriend?._id, messages.length]);
};

export default useListMessages;
