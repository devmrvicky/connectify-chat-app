import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

const AuthProtectedRouter = ({ children, authentication = true }) => {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && Boolean(authUser) !== authentication) {
      navigate("/login");
    } else if (!authentication && Boolean(authUser) !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [Boolean(authUser), navigate]);

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <VscLoading className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <>{children}</>
  );
};

export { AuthProtectedRouter };
