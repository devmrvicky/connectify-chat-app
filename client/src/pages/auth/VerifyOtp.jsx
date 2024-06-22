import React from "react";

const VerifyOtp = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <div className="label">
          <span className="label-text">Enter OTP</span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="text" className="grow" placeholder="******" />
        </label>
        <button type="submit" className="btn btn-accent">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
