import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

// AuthProtectedRouter protect routers. It checks if user authorized to use this router then show this particular page or user is not authorized then navigate to '/login' router
// it makes sure that only authorized or we can say logged in user can access a particular router otherwise navigate to '/login' page
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
