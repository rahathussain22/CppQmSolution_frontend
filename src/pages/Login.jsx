import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";

const primaryBlue = "#1976d2";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(
      { employeeId, password, role },
      {
        onSuccess: ({ user }) => {
          setUser(user[0]);
          navigate("/", { replace: true });
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            alert("Invalid employee id or password");
          } else {
            alert("Login failed");
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: primaryBlue }}
        >
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              style={{
                borderColor: "#CBD5E1",
                boxShadow: `0 0 0 2px ${primaryBlue}33`,
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = `0 0 0 2px ${primaryBlue}`)
              }
              onBlur={(e) =>
                (e.target.style.boxShadow = `0 0 0 2px ${primaryBlue}33`)
              }
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              style={{
                borderColor: "#CBD5E1",
                boxShadow: `0 0 0 2px ${primaryBlue}33`,
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = `0 0 0 2px ${primaryBlue}`)
              }
              onBlur={(e) =>
                (e.target.style.boxShadow = `0 0 0 2px ${primaryBlue}33`)
              }
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
                    className="accent-blue-600 w-4 h-4"
                    required
                  />
                  <span className="text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white py-2 rounded-md transition-colors font-medium"
            style={{ backgroundColor: primaryBlue }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565c0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = primaryBlue)}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium hover:underline"
            style={{ color: primaryBlue }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
