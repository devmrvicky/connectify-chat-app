import React from "react";

// this is layout of main content means we can say main page ui layout. There are two children inside it. First children will be a side bar of current page and second children will be main content area like chattingArea or friendRequests content
const MainContentLayout = ({ children }) => {
  return (
    <div className="flex h-full w-full">
      <div className="divider divider-horizontal max-[720px]:hidden"></div>
      {children[0]}
      <div className="divider divider-horizontal max-[420px]:hidden"></div>
      {children[1]}
    </div>
  );
};

export default MainContentLayout;
