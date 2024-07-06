import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useFriendStore } from "../../zustand/store";

const useFriendRequestsUpdate = () => {
  const {
    addFriendRequest,
    removeFriendRequestSend,
    rejectFriendRequest,
    removeMyFriend,
    addMyFriend,
  } = useFriendStore((store) => store);
  const { socket } = useSocketContext();

  useEffect(() => {
    const addNewFriendRequest = ({ request }) => {
      // addFriendRequest()
      console.log("add new request");
      addFriendRequest({ ...request._doc, senderId: request.senderId });
    };
    socket?.on("new-friend-request", addNewFriendRequest);

    const removeTargetFriendRequest = ({ receiverId }) => {
      // console.log(receiverId);
      rejectFriendRequest(receiverId);
      removeFriendRequestSend(receiverId);
      removeMyFriend(receiverId);
    };
    socket?.on("remove-friend-request", removeTargetFriendRequest);

    const addNewFriend = ({ friend }) => {
      addMyFriend(friend);
      // here removeFriendRequestSend is in sense of remove this particular friend from sended friend request list
      removeFriendRequestSend(friend._id);
    };
    socket?.on("accept-friend-request", addNewFriend);

    return () => {
      socket?.off("new-friend-request", addNewFriendRequest);
      socket?.off("remove-friend-request", removeTargetFriendRequest);
    };
  }, [socket, addFriendRequest, removeFriendRequestSend, rejectFriendRequest]);
};

export { useFriendRequestsUpdate };
