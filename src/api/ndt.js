import api from "../config/api";

const buildQuery = (params = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });
  const qs = queryParams.toString();
  return qs ? `?${qs}` : "";
};

// --- RT ---
export const createRT = async (body) => {
  return await api.post("/ndt/createRT", body);
};

export const getRT = async (params = {}) => {
  return await api.get(`/ndt/getRT${buildQuery(params)}`);
};

export const updateRT = async ({ id, body }) => {
  return await api.patch(`/ndt/updateRT/${id}`, body);
};

export const deleteRT = async ({ id }) => {
  return await api.delete(`/ndt/deleteRT/${id}`);
};

// --- UT ---
export const createUT = async (body) => {
  return await api.post("/ndt/createUT", body);
};

export const getUT = async (params = {}) => {
  return await api.get(`/ndt/getUT${buildQuery(params)}`);
};

export const updateUT = async ({ id, body }) => {
  return await api.patch(`/ndt/updateUT/${id}`, body);
};

export const deleteUT = async ({ id }) => {
  return await api.delete(`/ndt/deleteUT/${id}`);
};

