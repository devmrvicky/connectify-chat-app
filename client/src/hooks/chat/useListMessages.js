import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";

const useListMessages = () => {
  const { socket } = useSocketContext();
  const addMessage = useStore((store) => store.addMessage);

  useEffect(() => {
    socket?.on("newMessage", ({ message }) => {
      addMessage(message);
    });

    return () => socket?.off("newMessage");
  }, [socket, addMessage]);
};

export default useListMessages;
