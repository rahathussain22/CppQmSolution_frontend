import api from "../config/api";

export async function login({ employeeId, password, role }) {
  // Adjust endpoint as needed by backend
  const result = await api.post("/auth/login", {
    employeeId,
    password,
    role,
  });
  return result;
}
