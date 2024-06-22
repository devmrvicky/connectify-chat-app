import React, { useState } from "react";
import { useOTP } from "../../hooks/auth/useOTP";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const { verifying, verifyOtp } = useOTP();
  const { changeUserStatus } = useStore((store) => store);

  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await verifyOtp(otp, "otp/verify-otp");
    if (res && res?.status) {
      changeUserStatus("VERIFIED_AUTHORIZE");
      navigate("/signup");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="max-w-[500px] w-full mx-auto flex flex-col gap-2"
        onSubmit={handleVerifyOtp}
      >
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
          <input
            type="number"
            className="grow"
            placeholder="******"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={verifying}
          />
        </label>
        <button type="submit" className="btn btn-accent" disabled={verifying}>
          {verifying && <span className="loading loading-spinner"></span>}
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
