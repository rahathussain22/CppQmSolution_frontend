import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (accessToken) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default AuthLayout;
