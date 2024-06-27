import React, { useEffect } from "react";
import { useFriendRequest } from "../../hooks/friend/useFriendRequest";
import UserProfileLayout from "../../components/layout/UserProfileLayout";

const FriendRequests = () => {
  const { gettingRequests, friendRequests, receiveFriendRequests } =
    useFriendRequest();

  useEffect(() => {
    (async () => {
      await receiveFriendRequests();
    })();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <UserProfileLayout
        friends={friendRequests.map((request) => request.senderId)}
        loading={gettingRequests}
        isFriendRequest={true}
      />
    </div>
  );
};

export default FriendRequests;
