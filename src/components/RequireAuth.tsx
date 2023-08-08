import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export const RequireAuth = ({ children }: any) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
