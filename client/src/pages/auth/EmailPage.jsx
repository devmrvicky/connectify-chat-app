import { useState } from "react";
import { useOTP } from "../../hooks/auth/useOTP";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import VerifyOtp from "./VerifyOtp";

const EmailPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const { sendOtpOnEmail, loading } = useOTP();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const isEmailSend = await sendOtpOnEmail(email, "generate-otp");
    if (isEmailSend) {
      setOtpSent(true);
    }
  };

  return (
    <div className="max-w-[500px] w-full mx-auto h-full flex justify-center flex-col">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <form className=" flex flex-col gap-2" onSubmit={handleSendOtp}>
        <h2 className="self-start text-3xl p-2">Verify email</h2>
        <p>"Connect with the world. Start chatting."</p>
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
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || otpSent}
          />
        </label>
        {!otpSent && (
          <button type="submit" className="btn btn-accent" disabled={loading}>
            {loading && <span className="loading loading-spinner"></span>}
            Send OTP
          </button>
        )}
      </form>
      {otpSent && <VerifyOtp setOtpSent={setOtpSent} />}
      {!otpSent && (
        <p className="italic py-2">
          I haven already account. please{" "}
          <Link to="/login" className="hover:text-blue-500 underline">
            login
          </Link>{" "}
        </p>
      )}
    </div>
  );
};

export default EmailPage;
