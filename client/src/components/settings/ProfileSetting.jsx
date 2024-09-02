import React, { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { BsPenFill } from "react-icons/bs";
import Avatar from "../Avatar";
import { useAuthContext } from "../../context/AuthContext";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import ProfileImgEdit from "../ProfileImgEdit";
import { apiPut } from "../../api/api";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../api/serverUrl";
// import Avatar from "../../components/Avatar";
import { VscLoading } from "react-icons/vsc";
import { setUserToClient } from "../../utils/setUserToClient";

const ProfileSetting = () => {
  const [updating, setUpdating] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgLocalPath, setProfileImgLocalPath] = useState("");
  const [isChangeInProfile, setIsChangeInProfile] = useState(false);
  const { authUser } = useAuthContext();
  const { register, watch, setValue } = useForm({
    defaultValues: {
      fullName: authUser ? authUser.fullName : "",
      email: authUser ? authUser.email : "",
    },
  });
  const handleUploadProfileImgOnLocal = async (e) => {
    let file = e.target.files[0];
    setProfileImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // setIsFileChooses(true);
    reader.onload = () => {
      setProfileImgLocalPath(reader.result);
      setIsChangeInProfile(true);
    };
  };

  const handleResetChanges = () => {
    setValue("fullName", authUser?.fullName);
    setProfileImgLocalPath(authUser?.profilePic);
  };

  const newFullName = watch("fullName");

  // handle update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (authUser?.fullName !== newFullName) {
      formData.append("fullName", newFullName);
    }
    if (profileImgLocalPath && profileImgLocalPath !== authUser?.profilePic) {
      formData.append("profileImg", profileImg, profileImg.name || Date.now());
    } else {
      formData.append("profileImg", profileImgLocalPath);
    }
    try {
      setUpdating(true);
      const res = await fetch(`${SERVER_URL}/api/user/update-profile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!data.status) {
        toast.error(data.message, {
          id: "profile-update-error",
          position: "bottom-right",
        });
      } else {
        setUserToClient({ ...authUser, ...data.updatedProfileData });
        toast.success(data.message, {
          id: "profile-update",
          position: "bottom-right",
        });
        setIsChangeInProfile(false);
      }
    } catch (error) {
      toast.success(error.message, {
        id: "profile-update-error",
        position: "bottom-right",
      });
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (
      authUser?.fullName !== newFullName ||
      profileImgLocalPath !== authUser?.profilePic
    ) {
      console.log(profileImg);
      setIsChangeInProfile(true);
    } else {
      setIsChangeInProfile(false);
    }
  }, [
    newFullName,
    profileImgLocalPath,
    authUser?.fullName,
    authUser?.profilePic,
  ]);

  return (
    <div>
      <button
        className="flex items-center gap-2 p-3 w-full hover:bg-zinc-200/20 rounded-md cursor-pointer"
        onClick={(e) => {
          document.getElementById("profile-setting").showModal();
        }}
      >
        <BiUser className="w-6 h-6" />
        <span>Profile</span>
      </button>
      <dialog id="profile-setting" className="modal">
        <div className="modal-box p-0 w-full h-full max-w-full bg-white/10 backdrop-blur-md max-h-full rounded-none">
          <form method="dialog" className="absolute right-5 top-2 z-10">
            <button className="btn btn-md btn-circle btn-ghost text-xl">
              ✕
            </button>
          </form>
          <div className="w-full max-w-[500px] p-3 h-full mx-auto max-h-full bg-black">
            <p className="text-center py-3 text-xl">Profile settings</p>
            <form
              className="flex w-full flex-col items-center pt-3"
              onSubmit={handleUpdateProfile}
            >
              <ProfileImgEdit
                profileImgLocalPath={profileImgLocalPath}
                handleUploadProfileImgOnLocal={handleUploadProfileImgOnLocal}
                setProfileImgLocalPath={setProfileImgLocalPath}
              />
              <InputField
                type="text"
                label="Full name"
                name="fullName"
                register={register}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                register={register}
                disabled={true}
              />
              {isChangeInProfile && (
                <div className="flex py-2 gap-2 w-full my-4">
                  <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-black rounded-md"
                    disabled={updating}
                  >
                    {updating && (
                      <VscLoading className="animate-spin w-6 h-6" />
                    )}{" "}
                    update profile
                  </button>
                  <button
                    type="button"
                    className="w-full py-2 rounded-md border"
                    onClick={handleResetChanges}
                    disabled={updating}
                  >
                    reset profile
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileSetting;
