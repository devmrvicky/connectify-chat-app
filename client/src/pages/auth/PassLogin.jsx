import React from "react";
import useLogin from "../../hooks/auth/useLogin";
import { useForm } from "react-hook-form";
import { InputField } from "../../components";
import { Link } from "react-router-dom";

const PassLogin = () => {
  const { loading, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <form action="" className="w-full" onSubmit={handleSubmit(login)}>
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
      <p className="italic py-2">
        I haven't account. please{" "}
        <Link to="/signup" className="hover:text-blue-500 hover:underline">
          signup
        </Link>{" "}
      </p>
      <button
        type="submit"
        className="btn w-full my-3 bg-green-500 text-black hover:bg-green-600 flex items-center gap-2"
        disabled={loading}
      >
      {loading && <span className="loading loading-spinner loading-md"></span>}
        Login user
      </button>
    </form>
  );
};

export default PassLogin;
