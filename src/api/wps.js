import api from "../config/api";

export async function createWPS(formData) {
  return await api.post("/wps/create", formData);
}

export async function getWPS({
  projectId,
  wpsId,
  cursor,
  prevCursor,
  limit,
  search,
  searchBy,
  startDate,
  endDate,
} = {}) {
  const queryParams = new URLSearchParams();
  if (projectId) queryParams.append("projectId", projectId);
  if (wpsId) queryParams.append("wpsId", wpsId);
  if (cursor) queryParams.append("cursor", cursor);
  if (prevCursor) queryParams.append("prevCursor", prevCursor);
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(`/wps/get?${queryParams.toString()}`);
  console.log("getWPS response:", response);
  return response
}

export async function deleteWPS({ wpsId }) {
  return await api.delete(`/wps/delete/${wpsId}`);
}

export const exportWPS = async ({ search, searchBy, startDate, endDate }) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(`/wps/export?${queryParams.toString()}`);
  return response;
}
