import React from "react";
import { InputField } from "../../components";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/auth/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
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
    <div className="overflow-auto">
      <div className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <h1 className="text-3xl text-center py-3">Login user</h1>
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
            className="btn w-full my-3 bg-green-500 text-black hover:bg-green-600"
          >
            Login user
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
