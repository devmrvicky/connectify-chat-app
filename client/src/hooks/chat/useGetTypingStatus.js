import React, { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import { apiPost } from "../../api/api";
import toast from "react-hot-toast";
import { useSocketContext } from "../../context/SocketContext";

const useGetTypingStatus = () => {
  const [isTyping, setIsTyping] = useState(false);
  const { selectedFriend } = useStore((store) => store);
  const { socket } = useSocketContext();

  const sendTypingStatus = async (typingStatus) => {
    try {
      const data = await apiPost(`user/typing-status/${selectedFriend._id}`, {
        typingStatus,
      });
      if (!data.status) {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    socket?.on(
      "typingStatus",
      ({ isTyping }) => {
        console.log(isTyping);
        setIsTyping(isTyping);
      },
      [socket, setIsTyping]
    );

    return () => socket?.off("typingStatus");
  }, [socket, setIsTyping]);

  return { isTyping, sendTypingStatus };
};

export default useGetTypingStatus;
