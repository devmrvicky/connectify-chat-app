import React, { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { apiGet } from "../../api/api";
import UserProfileLayout from "../../components/layout/UserProfileLayout";
import { useAuthContext } from "../../context/AuthContext";

const MyFriends = () => {
  const [loading, setLoading] = useState(false);
  const [myFriends, setMyFriends] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGet("friend/get-all-friends");
      setMyFriends(
        data?.friends.map((request) =>
          request.senderId._id === authUser?._id
            ? request.receiverId
            : request.senderId
        )
      );
      setLoading(false);
    })();
  }, []);

  return (
    <UserProfileLayout
      friends={myFriends}
      loading={loading}
      isFriend={true}
      emptyUsersMessage="You haven't any friend"
    />
  );
};

export default MyFriends;
