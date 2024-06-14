import { useEffect, useState } from "react";
import { apiGet } from "../../api/api";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { selectedFriend, setMessages } = useStore((store) => ({
    selectedFriend: store.selectedFriend,
    setMessages: store.setMessages,
  }));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedFriend?._id]);

  return { loading };
};

export default useGetMessages;
