import useStore from "../../zustand/store";
import { apiPost } from "../../api/api";
import { toast } from "react-hot-toast";
import { useState } from "react";
import popSound from "../../assets/sound/pop.mp3";
import { useAuthContext } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "../../api/serverUrl";

const useSendChat = () => {
  const [loading, setLoading] = useState(false);
  const { selectedFriend, addMessage, updateLastMessage } = useStore(
    (store) => store
  );
  const { authUser } = useAuthContext();

  const sendChat = async (message) => {
    let msgFields = {
      status: "pending",
      senderId: authUser?._id,
      ...message,
      createdAt: new Date(),
      messageId: uuidv4(),
    };
    try {
      setLoading(true);
      addMessage(msgFields);
      console.log(msgFields);
      let data;

      if (message.type !== "text") {
        let tempFields = { ...msgFields };

        delete tempFields.fileSrc;
        delete tempFields.fileName;
        delete tempFields.file;
        // console.log(tempFields);

        const formData = new FormData();
        for (let [key, value] of Object.entries(tempFields)) {
          formData.append(key, value);
        }

        formData.append("file", message.file, message.file?.name || "");
        const res = await fetch(
          `${SERVER_URL}/api/messages/send/${selectedFriend?._id}`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        data = await res.json();
      } else if (message.type === "text") {
        data = await apiPost(`messages/send/${selectedFriend?._id}`, msgFields);
      }
      console.log(data);
      if (!data.status) {
        updateLastMessage({ ...msgFields, status: "failed" });
        // if (!data?.imgUploadStatus) {
        // }
        toast.error(data.message, {
          position: "bottom-right",
          id: "message error",
        });
        throw new Error(data.message);
      }
      // addMessage({status: 'success', ...data.message});
      updateLastMessage(data.message);
      const audio = new Audio(popSound);
      await audio.play();
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
