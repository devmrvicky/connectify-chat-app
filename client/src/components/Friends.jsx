import React, { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import { useAuthContext } from "../context/AuthContext";
import useStore from "../zustand/store";
import FriendListItem from "../pages/friends/FriendListItem";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const { authUser } = useAuthContext();
  const { searchedFriends } = useStore((store) => store);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiGet("user/all-users");

        if (!data.status) {
          throw new Error(data.message);
        }
        if (searchedFriends.length) {
          setFriends(searchedFriends);
        } else {
          setFriends(data.users);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authUser?._id, searchedFriends.length]);

  return <FriendListItem friends={friends} loading={loading} />;
};

export default Friends;
