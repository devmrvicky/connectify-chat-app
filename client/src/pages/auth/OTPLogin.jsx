import React, { useState } from "react";
import { useOTP } from "../../hooks/auth/useOTP";
import useStore from "../../zustand/store";
import { useAuthContext } from "../../context/AuthContext";
import { setUserToClient } from "../../utils/setUserToClient";
import toast from "react-hot-toast";
import Countdown from "react-countdown";

const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const { changeCurrentEmail } = useStore((store) => store);
  const { setAuthUser } = useAuthContext();

  const {
    sendOtpOnEmail,
    verifyOtp: verifyOtpAndLogin,
    loading,
    verifying,
  } = useOTP();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const isEmailSend = await sendOtpOnEmail(email, "generate-otp-for-login");
    if (isEmailSend) {
      setSendOtp(true);
    }
  };

  const handleVerifyOtpAndLogin = async (e) => {
    e.preventDefault();
    const data = await verifyOtpAndLogin(otp, "user/login-with-otp");
    changeCurrentEmail(null);

    console.log("user login successfully " + data.user.fullName);
    setAuthUser(data.user);
    setUserToClient(data.user);
    toast.success(data.message, {
      id: "login with otp",
    });
  };

  return (
    <form
      className="max-w-[500px] w-full mx-auto flex flex-col gap-2"
      onSubmit={!sendOtp ? handleSendOtp : handleVerifyOtpAndLogin}
    >
      <div className="label">
        <span className="label-text text-xl">Enter email</span>
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
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sendOtp}
          required
        />
      </label>
      {!sendOtp ? (
        <>
          <button
            type="submit"
            className="btn btn-accent"
            disabled={loading}
            // onClick={() => setSendOtp(true)}
          >
            {loading && <span className="loading loading-spinner"></span>}
            Send OTP
          </button>
        </>
      ) : (
        <div
          className="max-w-[500px] w-full mx-auto flex flex-col gap-2"
          // onSubmit={handleVerifyOtpAndLogin}
        >
          <div className="label">
            <span className="label-text text-xl">Enter OTP</span>
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
              required
            />
          </label>
          <p className="pb-3">
            otp resend in{" "}
            <Countdown
              date={Date.now() + 5000}
              onComplete={() => setSendOtp(false)}
            />{" "}
          </p>
          <button type="submit" className="btn btn-accent" disabled={verifying}>
            {verifying && <span className="loading loading-spinner"></span>}
            Verify OTP
          </button>
        </div>
      )}
    </form>
  );
};

export default OTPLogin;
