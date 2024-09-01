import React, { useEffect } from "react";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";

const SignupProtectedRouter = ({ children }) => {
  const navigate = useNavigate();
  const { USER_STATUS } = useStore((store) => store);

  useEffect(() => {
    switch (USER_STATUS) {
      case "UNAUTHORIZE":
        navigate("/email-verify");
        break;
      case "VERIFIED_AUTHORIZE":
        navigate("/signup");
        break;
      case "AUTHORIZE":
        navigate("/");
        break;
    }
  }, [navigate, USER_STATUS]);

  return <>{children}</>;
};

export default SignupProtectedRouter;
