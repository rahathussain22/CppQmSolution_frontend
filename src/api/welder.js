import api from "../config/api";

export async function createWelder(formData) {
  const response = await api.post("/welder/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getWelders({
  id,
  cursor,
  prevCursor,
  limit,
  search,
  searchBy,
  startDate,
  endDate,
} = {}) {
  const queryParams = new URLSearchParams();
  if (id) queryParams.append("id", id);
  if (cursor) queryParams.append("cursor", cursor);         // null won't pass this
  if (prevCursor) queryParams.append("prevCursor", prevCursor); // null won't pass this
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(`/welder/get?${queryParams.toString()}`);
  return response
}

export async function deleteWelder({ welderId }) {
  const response = await api.delete(`/welder/delete/${welderId}`);
  return response.data;
}

export async function createBulkWelders(formData) {
  const response = await api.post("/welder/create-bulk", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateWelder({ id, formData }) {
  const response = await api.patch(`/welder/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const exportWelders = async ({ search, searchBy, startDate, endDate }) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(`/welder/export?${queryParams.toString()}`);
  return response;
}