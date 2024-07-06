import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";
import receiveMsgSound from "../../assets/sound/receive-msg.mp3";

const useListMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage } = useStore((store) => store);

  useEffect(() => {
    socket?.on("newMessage", async ({ message }) => {
      addMessage(message);
      const audio = new Audio(receiveMsgSound);
      await audio.play();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);
};

export default useListMessages;
