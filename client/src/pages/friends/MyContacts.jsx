import React, { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { apiGet } from "../../api/api";
import UserProfileLayout from "../../components/layout/UserProfileLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useFriendStore } from "../../zustand/store";

const MyContacts = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const { myContacts, setMyContacts } = useFriendStore((store) => store);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await apiGet("friend/get-all-friends");
      setMyContacts(
        data?.friends.map((friend) =>
          friend.senderId._id === authUser?._id
            ? friend.receiverId
            : friend.senderId
        )
      );
      setLoading(false);
    })();
  }, []);

  return (
    <UserProfileLayout
      friends={myContacts}
      loading={loading}
      isFriend={true}
      isContact={true}
      emptyUsersMessage="You haven't any contact"
    />
  );
};

export default MyContacts;
