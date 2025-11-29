import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const user = useAuthStore((state) => state.user);
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AuthLayout;
