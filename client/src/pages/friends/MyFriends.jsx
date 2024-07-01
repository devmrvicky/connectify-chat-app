import React, { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { apiGet } from "../../api/api";
import UserProfileLayout from "../../components/layout/UserProfileLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useFriendStore } from "../../zustand/store";

const MyFriends = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const { myAllFriends, setMyAllFriends } = useFriendStore((store) => store);
  console.log(myAllFriends);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGet("friend/get-all-friends");
      setMyAllFriends(
        data?.friends.map((request) =>
          request.senderId._id === authUser?._id
            ? request.receiverId
            : request.senderId
        )
      );
      setLoading(false);
    })();
  }, [myAllFriends.length]);

  return (
    <UserProfileLayout
      friends={myAllFriends}
      loading={loading}
      isFriend={true}
      emptyUsersMessage="You haven't any friend"
    />
  );
};

export default MyFriends;
