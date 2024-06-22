import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../api/api";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";

const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const { currentEmail, changeCurrentEmail } = useStore((store) => store);

  const sendOtpOnEmail = async (email, endpoint) => {
    try {
      setLoading(true);
      const res = await apiPost(`otp/${endpoint}`, { email });
      if (!res.status) {
        toast.error(res.message, {
          id: "otp-send-error",
        });
        return res.status;
      }
      console.log(res.otpBody.otp);
      toast.success(res.message, {
        id: "otp-send",
      });
      changeCurrentEmail(email);
      return res.status;
      // changeUserStatus("REQUEST_AUTHORIZE")
      // navigate("/verify-otp");
    } catch (error) {
      toast.error(error.message, {
        id: "otp-send-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp, endpoint) => {
    try {
      if (otp.length !== 6) {
        toast.error("otp must be in 6 chars", {
          id: "otp-invalid",
        });
        return false;
      }
      setVerifying(true);
      const res = await apiPost(`${endpoint}`, {
        otp,
        email: currentEmail,
      });
      if (!res.status) {
        toast.error(res.message, {
          id: "otp-verify-error",
        });
        return false;
      }
      toast.success(res.message, {
        id: "otp-verify",
      });
      return res;
    } catch (error) {
      toast.error(error.message, {
        id: "otp-verify-error",
      });
    } finally {
      setVerifying(false);
    }
  };

  return { sendOtpOnEmail, loading, verifyOtp, verifying };
};

export { useOTP };
