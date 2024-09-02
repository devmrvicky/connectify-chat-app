import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useAuthContext } from "../context/AuthContext";

const ProfileImgEdit = ({
  handleUploadProfileImgOnLocal,
  profileImgLocalPath,
  setProfileImgLocalPath,
}) => {
  // const [profileImg, setProfileImg] = useState(null);
  // const [profileImgLocalPath, setProfileImgLocalPath] = useState("");
  const [showEditOptions, setShowEditOptions] = useState(false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    setProfileImgLocalPath(authUser?.profilePic);
  }, []);

  return (
    <div className="relative">
      <button type="button" onClick={() => setShowEditOptions((prev) => !prev)}>
        <Avatar
          dimension="w-40 h-40"
          // profilePic={
          //   profileImgLocalPath ? profileImgLocalPath : authUser?.profilePic
          // }
          profilePic={profileImgLocalPath}
        />
      </button>
      {showEditOptions && (
        <>
          <div
            className="fixed w-full h-full top-0 left-0"
            onClick={() => setShowEditOptions(false)}
          ></div>
          <div className="rounded-md bg-zinc-800 shadow-sm w-[150px] absolute top-1/2 left-1/2 flex flex-col gap-2 p-2">
            <label htmlFor="profile-img">
              <button
                type="button"
                className="rounded-md w-full py-2 hover:bg-zinc-950"
              >
                {authUser?.profilePic ? "change image" : "set image"}
              </button>
            </label>
            <input
              type="file"
              name="profile-img"
              id="profile-img"
              accept="image/*"
              // className="hidden"
              onChange={handleUploadProfileImgOnLocal}
            />
            {authUser?.profilePic && (
              <button
                type="button"
                className="rounded-md w-full py-2 hover:bg-zinc-950"
                onClick={() => setProfileImgLocalPath("")}
              >
                remove image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileImgEdit;
