import React, { useState } from "react";
import { InputField } from "../../components";
import { useForm } from "react-hook-form";
import useSignup from "../../hooks/auth/useSignup";
import Avatar from "../../components/Avatar";
import AvatarIcon from "../../assets/avatar-icon.png";
import { BsPenFill } from "react-icons/bs";

const Signup = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgLocalPath, setProfileImgLocalPath] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
  });

  const { handleSignup, loading } = useSignup();

  const handleUploadProfileImgOnLocal = async (e) => {
    let file = e.target.files[0];
    setProfileImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // setIsFileChooses(true);
    reader.onload = () => {
      setProfileImgLocalPath(reader.result);
    };
  };

  return (
    <div role="signup-page" className="w-full overflow-auto">
      <div className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <h1 className="text-3xl text-center py-3">Signup user</h1>
        <p className="text-center">"Enter your detail for find your friend."</p>
        <form
          action=""
          className="w-full"
          onSubmit={handleSubmit((data) =>
            handleSignup({ ...data, profileImg })
          )}
        >
          <div className="w-full flex justify-center flex-col gap-2 items-center">
            <p>Set your profile pic</p>
            <label htmlFor="profile-img" className="relative">
              <button
                type="button"
                className=" absolute right-[13px] bottom-[10px] p-1 z-10 -rotate-90"
              >
                <BsPenFill className="w-6 h-6" />
              </button>
              <Avatar
                dimension="w-40 h-40"
                profilePic={profileImg ? profileImgLocalPath : AvatarIcon}
              />
            </label>
            <input
              type="file"
              className="hidden"
              name="profileImg"
              id="profile-img"
              accept="image/*"
              // {...register("profileImg")}
              onChange={handleUploadProfileImgOnLocal}
            />
          </div>
          <InputField
            type="text"
            label="Full name"
            name="fullName"
            placeholder="Enter your full name"
            register={register}
            disabled={loading}
          />
          <InputField
            type="text"
            label="username"
            name="username"
            placeholder="@username"
            register={register}
            disabled={loading}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            placeholder="**********"
            register={register}
            disabled={loading}
          />
          <InputField
            type="password"
            label="confirm password"
            name="confirmPassword"
            placeholder="**********"
            register={register}
            disabled={loading}
            {...register("confirmPassword", { require: true })}
          />
          <div>
            <p className="text-xl py-2">Choose your gender</p>
            <label
              htmlFor="male"
              className="inline-flex gap-2 items-center pr-4"
            >
              <input
                type="radio"
                name="gender"
                id="male"
                className="radio border-black"
                value="male"
                {...register("gender")}
              />
              <span className="text-lg">Male</span>
            </label>
            <label htmlFor="female" className="inline-flex gap-2 items-center">
              <input
                type="radio"
                name="gender"
                id="female"
                className="radio border-black"
                value="female"
                {...register("gender")}
              />
              <span className="text-lg">Female</span>
            </label>
          </div>
          {/* <p className="italic py-2">
            I haven an account. please{" "}
            <Link to="/login" className="hover:text-blue-500 hover:underline">
              login
            </Link>{" "}
          </p> */}
          <button
            type="submit"
            className="btn w-full my-3 bg-green-500 text-black hover:bg-green-600"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            Signup user
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
