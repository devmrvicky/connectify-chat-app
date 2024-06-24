import React from "react";

const MainContentLayout = ({ children }) => {
  return (
    <div className="flex h-full w-full">
      <div className="divider divider-horizontal max-[620px]:hidden"></div>
      {children[0]}
      <div className="divider divider-horizontal max-[620px]:hidden"></div>
      {children[1]}
    </div>
  );
};

export default MainContentLayout;
