import React, { useEffect } from "react";
import { useFriendRequest } from "../../hooks/friend/useFriendRequest";
import UserProfileLayout from "../../components/layout/UserProfileLayout";
import { useFriendStore } from "../../zustand/store";

const FriendRequests = () => {
  const { gettingRequests, receiveFriendRequests } = useFriendRequest();

  const { allFriendsRequest } = useFriendStore((store) => store);

  useEffect(() => {
    (async () => {
      await receiveFriendRequests();
    })();
  }, [allFriendsRequest.length]);

  return (
    <div className="flex flex-col w-full h-full">
      <UserProfileLayout
        friends={allFriendsRequest.map((request) => request.senderId)}
        loading={gettingRequests}
        isFriendRequest={true}
      />
    </div>
  );
};

export default FriendRequests;
