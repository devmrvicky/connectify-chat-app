import React, { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { apiGet } from "../../api/api";

const MyFriends = () => {
  const [loading, setLoading] = useState(false);
  const [myFriends, setMyFriends] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGet("user/all-users");
      setMyFriends(data?.users);
      setLoading(false);
    })();
  }, []);
  return (
    <FriendListItem friends={myFriends} loading={loading} isFriend={true} />
  );
};

export default MyFriends;
