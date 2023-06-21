import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.reducerUser.userInfo);

  return isLoggedIn ? <>{children}</> : <Navigate to="/account" />;
};

export default PrivateRoute;
