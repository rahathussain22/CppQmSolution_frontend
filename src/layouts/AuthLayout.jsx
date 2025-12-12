import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (accessToken) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <img
        src="/assets/bg.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
