import React from "react";
import UserProfileSkeleton from "../../components/skeleton/UserProfileSkeleton";
import FriendProfile from "./FriendProfile";

const FriendListItem = ({ friends, loading, isFriend=false }) => {
  return !loading ? (
    friends.length ? (
      friends.map((friend, idx) => (
        <React.Fragment key={friend._id}>
          {/* <UserProfile {...friend} /> */}
          <FriendProfile {...friend} isFriend={isFriend} />
          {friends.length - 1 > idx && (
            <div className="divider divider-vertically m-0 h-0"></div>
          )}
        </React.Fragment>
      ))
    ) : (
      <NoUsersElement />
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

const NoUsersElement = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="py-3">Didn't find any active users.</p>
    </div>
  );
};

export default FriendListItem;
