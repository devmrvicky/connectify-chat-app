import React, { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { apiGet } from "../../api/api";
import UserProfileLayout from "../../components/layout/UserProfileLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useFriendStore } from "../../zustand/store";
import { getAllData } from "../../indexDB/indexdb";

const MyContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { authUser } = useAuthContext();

  const { myContacts } = useFriendStore((store) => store);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const data = await apiGet("friend/get-all-friends");
      if (!authUser) return;
      const data = await getAllData({
        storeName: `contacts_list`,
      });
      // console.log(data);
      // above api call give use all friends of this particular user (all these users which 'request' field will be 'confirm' between this particular user)
      // in friend schema there is a field call 'senderId'. and this senderId* will be this user or could be his friend. So we have to check conditionally that if friend's senderId match with this user then myContact will be receiverId* or if doesn't match then myContact will be senderId
      // *here senderId and receiverId doesn't indicate sender and receiver ids it is indicate whole document or obj of sender and receiver. (this is because on backed when we are querying to get all friends we are using .populate method to get sender and receiver document or obj)
      setContacts(data);
      setLoading(false);
    })();
  }, [myContacts.length, authUser]);

  return (
    <UserProfileLayout
      friends={contacts}
      loading={loading}
      isFriend={true}
      isContact={true}
      emptyUsersMessage="You haven't any contact"
    />
  );
};

export default MyContacts;
