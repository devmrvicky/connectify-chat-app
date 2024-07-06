import React from "react";
import UserProfileSkeleton from "../../components/skeleton/UserProfileSkeleton";
import FriendProfile from "../../pages/friends/FriendProfile";
import ContactProfile from "../ContactProfile";

// this is user profile layout. My contacts, my friends, all users/friends, requests(sender or receiver) these have same layout. like all components will show loading indicator or skelton until data don't load fully, all components will show empty message if don't have any user or friend.
// this is complex and little bit confusing layout component
// this layout component take some props
// 1. friends:- all friends, contacts list, all friends request (received or sended)
// 2. loading:- this is indicator which show that data loaded or not
// 3. isContact:- this indicator shows that given friends list are contact or not
// 4. isFriend:- friends list or not
// 5. isFriendRequest:- is it friend request(received)
// 6. isSendFriendRequest:- is it sended friend request
// 7. emptyUsersMessage:- a string that appears when user has no one contact or friend or request
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
            <ContactProfile {...friend} />
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
