import React, { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import UserProfile from "./UserProfile";
import { VscLoading } from "react-icons/vsc";
import { useAuthContext } from "../context/AuthContext";

const Friends = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiGet("user/all-users");
        console.log(data);
        if (!data.status) {
          throw new Error(data.message);
        }
        setFriends(data.users);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authUser?._id]);
  return !loading ? (
    friends.length ? (
      friends.map((friend, idx) => (
        <React.Fragment key={friend._id}>
          <UserProfile {...friend} />
          {friends.length - 1 > idx && (
            <div className="divider divider-vertically m-0 h-0"></div>
          )}
        </React.Fragment>
      ))
    ) : (
      <div className="w-full text-center">
        <p className="py-3 text-xs ">you haven't any friend</p>
      </div>
    )
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <VscLoading className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Friends;
