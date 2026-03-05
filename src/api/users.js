import api from "../config/api";

export async function createUser({
  username,
  password,
  fullName,
  email,
  phoneNumber,
  employeeId,
  department,
  role,
  permissions,
}) {
  return await api.post("/auth/registerUser", {
    username,
    password,
    fullName,
    email,
    phoneNumber,
    employeeId,
    department,
    role,
    permissions,
  });
}

export async function updateUser({
  id,
  username,
  password,
  fullName,
  email,
  phoneNumber,
  employeeId,
  department,
  role,
  permissions,
}) {
  return await api.patch("/user/update", {
    id,
    username,
    password,
    fullName,
    email,
    phoneNumber,
    employeeId,
    department,
    role,
    permissions,
  });
}

export async function getUsers(params = {}) {
  const queryParams = new URLSearchParams();
  if (params.projectId) queryParams.append("projectId", params.projectId);
  const qs = queryParams.toString();
  const response = await api.get(qs ? `/user/get?${qs}` : "/user/get");
  return response;
}

export async function deleteUser({ id }) {
  return await api.delete(`/user/delete/${id}`);
}

