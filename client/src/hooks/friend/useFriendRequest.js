import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { useState } from "react";

const useFriendRequest = () => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [acceptingRequest, setAcceptingRequest] = useState(false);
  const [removingRequest, setRemovingRequest] = useState(false);
  const [gettingRequests, setGettingRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  const sendFriendRequest = async (receiverId) => {
    try {
      setSendingRequest(true);
      const res = await apiPost(`friend/send-request/${receiverId}`);
      if (!res.status) {
        return toast.error(res.message, {
          id: "send request error",
        });
      }
      toast.success(res.message, {
        id: "send request successfully",
      });
    } catch (error) {
      toast.error(error.message, {
        id: "send request error",
      });
    } finally {
      setSendingRequest(false);
    }
  };

  const acceptFriendRequest = async (senderId) => {
    try {
      setAcceptingRequest(true);
      const res = await apiPut(`friend/accept-request/${senderId}`);
      if (!res.status) {
        return toast.error(res.message, {
          id: "accept request error",
        });
      }
      toast.success(res.message, {
        id: "request accepted",
      });
    } catch (error) {
      toast.error(res.message, {
        id: "accept request error",
      });
    } finally {
      setAcceptingRequest(false);
    }
  };

  const removeFriendRequest = async (senderId) => {
    try {
      setRemovingRequest(true);
      const res = await apiDelete(`friend/remove-request/${senderId}`);
      if (!res.status) {
        return toast.error(res.message, {
          id: "accept request error",
        });
      }
      toast.success(res.message, {
        id: "request accepted",
      });
    } catch (error) {
      toast.error(res.message, {
        id: "accept request error",
      });
    } finally {
      setRemovingRequest(false);
    }
  };

  const receiveFriendRequests = async () => {
    try {
      setGettingRequests(true);
      const res = await apiGet("friend/receive-requests");
      if (!res.status) {
        return toast.error(res.message, {
          id: "requests error",
        });
      }
      setFriendRequests(res.friendRequests);
    } catch (error) {
      return toast.error(res.message, {
        id: "requests error",
      });
    } finally {
      setGettingRequests(false);
    }
  };

  return {
    sendingRequest,
    sendFriendRequest,
    acceptingRequest,
    acceptFriendRequest,
    removingRequest,
    removeFriendRequest,
    gettingRequests,
    friendRequests,
    receiveFriendRequests,
  };
};

export { useFriendRequest };
