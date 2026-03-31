import api from "../config/api";

export async function createRFILog(formData) {
  // Accept FormData or a plain object. If it's FormData, Axios will set the correct headers.
  return await api.post("/rfi/create", formData);
}

export async function getRFILogs({
  projectCode,
  discipline,
  status,
  cursor,
  prevCursor,
  limit,
  search,
  searchBy,
} = {}) {
  const queryParams = new URLSearchParams();
  if (projectCode) queryParams.append("projectCode", projectCode);
  if (discipline) queryParams.append("discipline", discipline);
  if (status) queryParams.append("status", status);
  if (cursor) queryParams.append("cursor", cursor);
  if (prevCursor) queryParams.append("prevCursor", prevCursor);
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);

  const response = await api.get(`/rfi/get?${queryParams.toString()}`);
  return response;
}

export async function updateRFILog(formData, id) {
  // Accept FormData or regular object
  return await api.patch(`/rfi/update/${id}`, formData);
}

export async function bulkCreateRFILog(file) {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/rfi/bulkCreate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteRFILog({ id }) {
  return await api.delete(`/rfi/delete/${id}`);
}

export async function generateRFILogForm({ id }) {
  return await api.post("/rfi/generateForm", { id });
}

export async function exportRFILogs(filters) {
  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.append("search", filters.search);
  if (filters.searchBy) queryParams.append("searchBy", filters.searchBy); 
  if (filters.startDate) queryParams.append("startDate", filters.startDate);
  if (filters.endDate) queryParams.append("endDate", filters.endDate);

  return await api.get(`/rfi/export?${queryParams.toString()}`);

}
