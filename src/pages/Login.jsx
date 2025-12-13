import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(
      { employeeId, password, role },
      {
        onSuccess: ({ user, accessToken }) => {
          setUser(user);
          setAccessToken(accessToken);
          localStorage.setItem("accessToken", accessToken);
          navigate("/home", { replace: true });
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            toast.error("Invalid employee ID or password", {
              duration: 5000,
            });
          } else {
            toast.error("Login failed", {
              duration: 5000
            });
          }
        },
      }
    );
  };

  const roles = [
    "Admin",
    "Piping",
    "Electrical",
    "Mechanical",
    "Structural",
    "Pressure Vessel",
    "Manufacturers Data Report",
    "Tank",
  ];

  return (
    <div className="w-full max-w-md px-4">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/assets/cppqm-logo.jpeg"
            alt="CPPQM Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div className="mt-4">
            <span className="block text-gray-700 mb-2">Select Role</span>
            <div className="flex flex-wrap gap-3">
              {roles.map((r) => (
                <label
                  key={r}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-red-600 w-4 h-4"
                    required
                  />
                  <span className="text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white py-2 rounded-md transition-colors font-medium bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-red-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
