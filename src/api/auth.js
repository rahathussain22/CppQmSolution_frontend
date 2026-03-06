import api from "../config/api";

export async function login({ employeeId, password }) {
  // Adjust endpoint as needed by backend
  const result = await api.post("/auth/login", {
    employeeId,
    password,
  });
  return result;
}
