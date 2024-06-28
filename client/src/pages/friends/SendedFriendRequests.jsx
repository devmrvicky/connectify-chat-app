import React, { useEffect, useState } from "react";
import { useFriendStore } from "../../zustand/store";
import { apiGet } from "../../api/api";
import toast from "react-hot-toast";
import UserProfileLayout from "../../components/layout/UserProfileLayout";

const SendedFriendRequests = () => {
  const [loading, setLoading] = useState(false);
  const { allFriendsRequestSend, setAllFriendsRequestSend } = useFriendStore(
    (store) => store
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGet("friend/get-all-sended-requests");
      if (!data.status) {
        toast.error(data.message, {
          id: "get sended requests error",
        });
        return;
      }
      setAllFriendsRequestSend(data?.friendRequests);
      setLoading(false);
    })();
  }, []);

  return (
    <UserProfileLayout
      friends={allFriendsRequestSend.map((request) => request.receiverId)}
      loading={loading}
      isFriend={false}
      isSendFriendRequest={true}
      emptyUsersMessage="You haven't sent any friend request"
    />
  );
};

export default SendedFriendRequests;
