import React, { useState } from "react";
import PassLogin from "./PassLogin";
import OTPLogin from "./OTPLogin";

const Login = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div role="login-page" className="w-full overflow-auto">
      <div className="max-w-[500px] w-full mx-auto flex flex-col gap-2">
        <h1 className="text-3xl text-center py-3">Login user</h1>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Login with OTP</span>
            <input
              type="checkbox"
              className="toggle"
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
          </label>
        </div>
        {!checked ? <PassLogin /> : <OTPLogin />}
      </div>
    </div>
  );
};

export default Login;
