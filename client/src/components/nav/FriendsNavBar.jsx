import React from "react";
import SearchBox from "../SearchBox";

const FriendsNavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <p>Friend requests</p>
        <SearchBox />
      </div>
    </div>
  );
};

export default FriendsNavBar;
