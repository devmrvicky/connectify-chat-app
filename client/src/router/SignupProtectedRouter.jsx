import React, { useEffect } from "react";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";

const SignupProtectedRouter = ({ children }) => {
  const navigate = useNavigate();
  const { USER_SIGNUP_STATUS } = useStore((store) => store);

  useEffect(() => {
    switch (USER_SIGNUP_STATUS) {
      case "UNAUTHORIZE":
        return navigate("/send-otp");
        break;
      case "REQUEST_AUTHORIZE":
        navigate("/verify-otp");
        break;
      case "VERIFIED_AUTHORIZE":
        navigate("/signup");
        break;
      case "AUTHORIZE":
        navigate("/");
        break;
    }
  }, []);

  return <>{children}</>;
};

export default SignupProtectedRouter;
