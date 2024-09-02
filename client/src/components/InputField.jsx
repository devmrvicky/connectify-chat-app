import React from "react";

const InputField = ({
  type = "text",
  label,
  placeholder,
  name,
  error = false,
  errorMessage = "",
  register,
  ...prop
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-xl">{label}</span>
      </div>
      <input
        type={`${type}`}
        placeholder={`${placeholder}`}
        name={name}
        className="input input-bordered w-full"
        {...register(name, { require: true })}
        {...prop}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </div>
      )}
    </label>
  );
};

export default InputField;
