import React, { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import { useAuthContext } from "../context/AuthContext";
import useStore, { useFriendStore } from "../zustand/store";
import FriendListItem from "../pages/friends/FriendListItem";
import UserProfileLayout from "./layout/UserProfileLayout";
import { useFriendRequest } from "../hooks/friend/useFriendRequest";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const { authUser } = useAuthContext();
  const { searchedFriends } = useStore((store) => store);

  const { allFriends, setAllFriends } = useFriendStore((store) => store);

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
          setAllFriends(data.users);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authUser?._id, searchedFriends.length]);

  return (
    <UserProfileLayout
      friends={allFriends}
      loading={loading}
      emptyUsersMessage="Didn't find any active user"
    />
  );
};

export default Friends;
