import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: login, isPending: isLoading } = useLogin();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(
      { employeeId, password },
      {
        onSuccess: ({ user, accessToken }) => {
          setUser(user);
          setAccessToken(accessToken);
          localStorage.setItem("accessToken", accessToken);
          navigate("/home", { replace: true });
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            toast.error("Invalid employee ID or password", { duration: 5000 });
          } else {
            toast.error("Login failed", { duration: 5000 });
          }
        },
      }
    );
  };

  return (
    <div className="w-full px-10 py-12">
      <h2
        className="text-3xl font-bold mb-8 text-gray-900"
        style={{ fontFamily: "'Segoe UI', sans-serif" }}
      >
        Log in
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username field */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <User size={16} />
          </span>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee Id"
            className="w-full pl-9 pr-4 py-3 bg-gray-100 border-0 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
        </div>

        {/* Password field */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Lock size={16} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-9 pr-10 py-3 bg-gray-100 border-0 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between text-sm px-1">
          <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 accent-gray-700 rounded"
            />
            Remember Me
          </label>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Forgot Password?
          </a>
        </div>

        {/* Login button */}
        <Button
          type="submit"
          className="w-full py-3 rounded-full bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;