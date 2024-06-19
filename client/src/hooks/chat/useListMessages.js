import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useStore from "../../zustand/store";

const useListMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage, addLastConversation } = useStore((store) => store);

  useEffect(() => {
    socket?.on("newMessage", ({ message }) => {
      addMessage(message);
      addLastConversation(message);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, addMessage, addLastConversation]);
};

export default useListMessages;
