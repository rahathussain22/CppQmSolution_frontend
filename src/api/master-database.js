import api from "../config/api";

export async function getDatabase({ cursor, prevCursor, limit, search, column } = {}) {
  const params = {};
  if (limit) params.limit = limit;
  if (cursor) params.cursor = cursor;
  if (prevCursor) params.prevCursor = prevCursor;
  if (search) params.search = search;
  if (column) params.column = column;

  const result = await api.get("/master-database/get", { params });
  return result;
}

export async function createDatabase(data) {
  return await api.post("/master-database/create", data);
}

export async function updateDatabase(id, data) {
  return await api.patch(`/master-database/update/${id}`, data);
}

export async function deleteDatabase(id) {
  return await api.delete(`/master-database/delete/${id}`);
}

export async function bulkEditDatabase(file) {
  const formData = new FormData();
  formData.append("file", file);

  return await api.post("/master-database/bulkEdit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function exportMasterDatabase({ search, column } = {}) {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (column) queryParams.append("column", column);

  return await api.get(`/master-database/export?${queryParams.toString()}`);
}
