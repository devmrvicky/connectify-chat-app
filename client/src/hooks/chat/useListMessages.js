import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";
import receiveMsgSound from "../../assets/sound/receive-msg.mp3";
import { useAuthContext } from "../../context/AuthContext";

const useListMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage, selectedFriend } = useStore((store) => store);

  const { authUser } = useAuthContext();

  useEffect(() => {
    socket?.on("newMessage", async ({ message }) => {
      console.log(
        { senderId: message.senderId },
        { receiverId: message.receiverId },
        { id: selectedFriend?._id },
        message.senderId === selectedFriend?._id
      );
      if (message.senderId === selectedFriend?._id) {
        console.log(message);
        addMessage(message);
        const audio = new Audio(receiveMsgSound);
        await audio.play();
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, selectedFriend?._id]);
};

export default useListMessages;
