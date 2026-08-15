import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext/userContext";

function AuthRoute() {
  const { user } = useContext(UserContext);
  // allow only authenticated users (user array non-empty)
  return user && user.length > 0 ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthRoute;
