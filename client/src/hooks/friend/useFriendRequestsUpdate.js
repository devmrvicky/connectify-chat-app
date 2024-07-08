import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useFriendStore } from "../../zustand/store";
import { useAuthContext } from "../../context/AuthContext";

const useFriendRequestsUpdate = () => {
  const {
    addFriendRequest,
    removeFriendRequestSend,
    rejectFriendRequest,
    removeMyFriend,
    addMyFriend,
    addFriendRequestNotification,
    allFriendsRequest,
  } = useFriendStore((store) => store);
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const addNewFriendRequest = ({ request }) => {
      console.log("add new request");
      addFriendRequest({ ...request._doc, senderId: request.senderId });
      addFriendRequestNotification({
        type: "friend-request",
        ...request._doc,
        senderId: request.senderId,
      });
    };
    socket?.on("new-friend-request", addNewFriendRequest);

    const removeTargetFriendRequest = ({ receiverId, removeActionType }) => {
      rejectFriendRequest(receiverId);
      removeFriendRequestSend(receiverId);
      removeMyFriend(receiverId);
      if (removeActionType === "reject-friend-request") {
        addFriendRequestNotification({
          type: "rejected-friend-request",
          ...authUser,
        });
      }

      // here in both code block we have to sender or receiver details instead of auth user
      if (removeActionType === "remove-friend-request") {
        addFriendRequestNotification({
          type: "remove-sended-friend-request",
          ...authUser,
        });
      }
      if (removeActionType === "remove-my-friend") {
        addFriendRequestNotification({
          type: "remove-my-friend",
          ...authUser,
        });
      }
    };
    socket?.on("remove-friend-request", removeTargetFriendRequest);

    const addNewFriend = ({ friend }) => {
      addMyFriend(friend);
      // here removeFriendRequestSend is in sense of remove this particular friend from sended friend request list
      removeFriendRequestSend(friend._id);
      addFriendRequestNotification({
        type: "accepted-friend-request",
        ...friend,
      });
    };
    socket?.on("accept-friend-request", addNewFriend);

    return () => {
      socket?.off("new-friend-request", addNewFriendRequest);
      socket?.off("remove-friend-request", removeTargetFriendRequest);
      socket?.off("accept-friend-request", addNewFriend);
    };
  }, [socket, addFriendRequest, removeFriendRequestSend, rejectFriendRequest]);
};

export { useFriendRequestsUpdate };
