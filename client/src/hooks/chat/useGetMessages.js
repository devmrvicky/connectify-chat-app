import { useEffect, useState } from "react";
import { apiGet } from "../../api/api";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";

const useGetMessages = () => {
  const [messages, setMessages] = useState([]);

  const selectedFriend = useStore((store) => store.selectedFriend);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet(`messages/${selectedFriend._id}`);
        if (!data.status) {
          toast.error(data.message);
          throw new Error(data.message);
        }
        setMessages(data.messages);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    })();
  }, [selectedFriend?._id]);

  return { messages };
};

export default useGetMessages;
