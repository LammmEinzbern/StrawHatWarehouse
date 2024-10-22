import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthAdmin() {
  const location = useLocation();

  const [keyUser, setKeyUser] = useState(
    localStorage.getItem("sb-qehdylpssbqwhaiwvzcp-auth-token")
  );
  const { user, role } = useAuth();
  return keyUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default AuthAdmin;
