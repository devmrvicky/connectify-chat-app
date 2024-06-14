import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../context/AuthContext";
import UserProfileSkeleton from "./skeleton/UserProfileSkeleton";
import useStore from "../zustand/store";

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
    // skeleton
    <>
      <UserProfileSkeleton />
      <UserProfileSkeleton />
      <UserProfileSkeleton />
      <UserProfileSkeleton />
      <UserProfileSkeleton />
    </>
  );
};

export default Friends;
