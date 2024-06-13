import React from "react";
import { InputField } from "../../components";
import { useForm } from "react-hook-form";
import useSignup from "../../hooks/auth/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
  });

  const { handleSignup } = useSignup();

  return (
    <div>
      <div className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <h1 className="text-3xl text-center py-3">Signup user</h1>
        <form
          action=""
          className="w-full"
          onSubmit={handleSubmit(handleSignup)}
        >
          <InputField
            type="text"
            label="Full name"
            name="fullName"
            placeholder="Enter your full name"
            register={register}
          />
          <InputField
            type="text"
            label="username"
            name="username"
            placeholder="@username"
            register={register}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            placeholder="**********"
            register={register}
          />
          <InputField
            type="password"
            label="confirm password"
            name="confirmPassword"
            placeholder="**********"
            register={register}
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
          <p className="italic py-2">
            I haven an account. please{" "}
            <Link to="/login" className="hover:text-blue-500 hover:underline">
              login
            </Link>{" "}
          </p>
          <button
            type="submit"
            className="btn w-full my-3 bg-green-500 text-black hover:bg-green-600"
          >
            Signup user
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
