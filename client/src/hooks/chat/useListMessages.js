import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";

const useListMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage } = useStore((store) => store);

  useEffect(() => {
    socket?.on("newMessage", ({ message }) => {
      addMessage(message);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);
};

export default useListMessages;
