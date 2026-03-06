import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (accessToken) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Full-page background */}
      <img
        src="/assets/bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-4xl min-h-[520px] flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Left branding panel — semi-transparent so bg shows through */}
        <div className="relative flex-1 flex flex-col justify-between p-8 bg-black/30 backdrop-blur-sm">
          <div>
            <span className="text-white font-bold text-2xl tracking-wide"
              style={{ fontFamily: "'Segoe UI', sans-serif" }}>
              QMSolutions
            </span>
          </div>

          <div className="flex justify-center items-center flex-1 py-6">
            <img
              src="/assets/logo.svg"
              alt="CSSP Logo"
              className="size-72 object-contain drop-shadow-2xl"
            />
          </div>

          <div>
            <h1 className="text-white font-extrabold text-2xl"
              style={{ fontFamily: "'Segoe UI', sans-serif" }}>
              Welcome to CSSP
            </h1>
          </div>
        </div>

        {/* Right white login panel */}
        <div
          className="flex items-center justify-center bg-white"
          style={{ width: "400px", minWidth: "340px" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;