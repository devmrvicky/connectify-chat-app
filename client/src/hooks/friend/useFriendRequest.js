import toast from "react-hot-toast";
import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import { useState } from "react";
import { useFriendStore } from "../../zustand/store";

// this costume hook is responsible for sending requests, receiving requests, removing request
const useFriendRequest = () => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [acceptingRequest, setAcceptingRequest] = useState(false);
  const [removingRequest, setRemovingRequest] = useState(false);
  const [gettingRequests, setGettingRequests] = useState(false);

  const {
    setAllFriendsRequest,
    rejectFriendRequest,
    removeFriendRequestSend,
    removeMyFriend,
  } = useFriendStore((store) => store);

  const sendFriendRequest = async (receiverId) => {
    try {
      setSendingRequest(true);
      console.log("send request");
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

  // this function responsible for removing (rejecting) friend request and also from my friends list locally
  // It takes an id and a remove type(like what do you want rejecting friend request, removing sended friend requests or remove from my friend list )
  const removeAndRejectFriendRequestFromLocal = (id, removeType) => {
    switch (removeType) {
      case "reject-friend-request":
        rejectFriendRequest(id);
        break;
      case "remove-friend-request":
        removeFriendRequestSend(id);
        break;
      case "remove-my-friend":
        removeMyFriend(id);
        break;
      default:
        console.log("please provide removeType");
        break;
    }
  };

  // this function is responsible for removing and rejecting friend request (received or sended). from database and also from local (for this it will call removeAndRejectFriendRequestFromLocal function)
  const removeFriendRequest = async (senderId, removeType) => {
    try {
      setRemovingRequest(true);
      // console.log(removeType);
      // return;
      const res = await apiDelete(`friend/remove-request/${senderId}`, {removeActionType: removeType});
      console.log(res);
      if (!res?.status) {
        return toast.error(res.message, {
          id: "remove request error",
        });
      }
      toast.success(res.message, {
        id: "request removed or rejected",
      });
      removeAndRejectFriendRequestFromLocal(senderId, removeType);
    } catch (error) {
      toast.error(error.message, {
        id: "remove request error",
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
      console.log(res.friendRequests);
      setAllFriendsRequest(res.friendRequests);
    } catch (error) {
      toast.error(res?.message, {
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
    receiveFriendRequests,
    removeAndRejectFriendRequestFromLocal,
  };
};

export { useFriendRequest };
