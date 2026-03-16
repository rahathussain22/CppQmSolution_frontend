import api from "../config/api";

export async function createWelder({
  rootA,
  rootB,
  fillA,
  fillB,
  capA,
  capB,
  weldNumber,
}) {
  return await api.post("/welder/create", {
    rootA,
    rootB,
    fillA,
    fillB,
    capA,
    capB,
    weldNumber,
  });
}

export async function getWelders({
  projectId,
  welderId,
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
  if (welderId) queryParams.append("welderId", welderId);
  if (cursor) queryParams.append("cursor", cursor);
  if (prevCursor) queryParams.append("prevCursor", prevCursor);
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(
    `/welder/getWelders?${queryParams.toString()}`
  );
  // Backend returns: { pagination, welders, count }
  return response;
}

export async function deleteWelder({ welderId }) {
  return await api.delete(`/welder/delete/${welderId}`);
}
