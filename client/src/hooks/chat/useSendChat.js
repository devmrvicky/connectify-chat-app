import useStore from "../../zustand/store";
import { apiPost } from "../../api/api";
import { toast } from "react-hot-toast";
import { useState } from "react";

const useSendChat = () => {
  const [loading, setLoading] = useState(false);
  const selectedFriend = useStore((store) => store.selectedFriend);

  const sendChat = async (message) => {
    try {
      console.log(selectedFriend);
      setLoading(true);
      const data = await apiPost(`messages/send/${selectedFriend?._id}`, {
        message,
      });
      if (!data.status) {
        toast.error(data.message, {
          position: "bottom-right",
          id: "message error",
        });
        throw new Error(data.message);
      }
      toast.success("message sent", {
        position: "bottom-right",
        id: "message sent",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        id: "message error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { sendChat, loading };
};

export default useSendChat;
