import React from "react";
// import InputField from '../../components/InputField'

const EmailPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <div className="label">
          <span className="label-text">Enter email</span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <button type="submit" className="btn btn-accent">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default EmailPage;
