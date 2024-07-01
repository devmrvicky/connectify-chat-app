import React from "react";
import UserProfileSkeleton from "../../components/skeleton/UserProfileSkeleton";
import FriendProfile from "../../pages/friends/FriendProfile";
import UserProfile from "../UserProfile";

const UserProfileLayout = ({
  friends,
  loading,
  isContact = false,
  isFriend = false,
  isFriendRequest = false,
  isSendFriendRequest = false,
  emptyUsersMessage = "didn't find any friend",
}) => {
  return !loading ? (
    friends?.length ? (
      friends?.map((friend, idx) => (
        <React.Fragment key={friend._id}>
          {isContact ? (
            <UserProfile {...friend} />
          ) : (
            <FriendProfile
              {...friend}
              isFriend={isFriend}
              isFriendRequest={isFriendRequest}
              isSendFriendRequest={isSendFriendRequest}
            />
          )}
          {friends.length - 1 > idx && (
            <div className="divider divider-vertically m-0 h-0"></div>
          )}
        </React.Fragment>
      ))
    ) : (
      <NoUsersElement emptyUsersMessage={emptyUsersMessage} />
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

const NoUsersElement = ({ emptyUsersMessage }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="py-3">{emptyUsersMessage}</p>
    </div>
  );
};

export default UserProfileLayout;
