import api from "../config/api";

export async function createWPS(formData) {
  return await api.post("/wps/create", formData);
}

export async function getWPS({ projectId, wpsId }) {
  const queryParams = new URLSearchParams();
  if (projectId) queryParams.append("projectId", projectId);
  if (wpsId) queryParams.append("wpsId", wpsId);
  const response = await api.get(`/wps/getWPS?${queryParams.toString()}`);
  return response;
}

export async function deleteWPS({ wpsId }) {
  return await api.delete(`/wps/delete/${wpsId}`);
}
