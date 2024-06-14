import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="flex gap-4 items-center mt-4">
      <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-2 w-28"></div>
        <div className="skeleton h-2 w-20"></div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
