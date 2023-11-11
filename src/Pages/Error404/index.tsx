import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Error404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard");
  }, [location.pathname, navigate]);

  return <div>Error 404</div>;
};

export default Error404;
