import toast from "react-hot-toast";
import { apiDelete } from "../../api/api";
import useStore from "../../zustand/store";
import { useState } from "react";

const useDeleteChat = () => {
  const { removeMessage } = useStore((store) => store);
  const [deletion, setDeletion] = useState(false);

  const deleteChat = async ({ remoteUserId, messageId, publicId }) => {
    try {
      setDeletion(true);
      const res = await apiDelete(`messages/delete/${messageId}`, {
        remoteUserId,
        publicId,
      });
      if (!res.status) {
        return toast.error(res.message, {
          position: "bottom-right",
          id: "delete error",
        });
      }
      removeMessage(messageId);
      console.log("successfully deletion");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        id: "delete error",
      });
    } finally {
      setDeletion(false);
    }
  };

  return { deleteChat, deletion };
};

export { useDeleteChat };
