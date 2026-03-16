import api from "../config/api";

export async function createComponent({
  name,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
}) {
  return await api.post("/component/add", {
    name,
    material,
    diameter,
    length,
    thickness,
    pipeNumber,
    heatNumber,
  });
}

export async function getComponents({
  cursor,
  prevCursor,
  limit,
  search,
  searchBy,
  startDate,
  endDate,
} = {}) {
  const queryParams = new URLSearchParams();
  if (cursor) queryParams.append("cursor", cursor);
  if (prevCursor) queryParams.append("prevCursor", prevCursor);
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (searchBy) queryParams.append("searchBy", searchBy);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const response = await api.get(
    `/component/get?${queryParams.toString()}`
  );
  // Backend returns: { pagination, count, data: [...] }
  return response;
}

export async function updateComponent({
  componentId,
  name,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
}) {
  return await api.patch("/component/update", {
    componentId,
    name,
    material,
    diameter,
    length,
    thickness,
    pipeNumber,
    heatNumber,
  });
}

export async function deleteComponent({ componentId, componentCode }) {
  return await api.delete(`/component/delete/${componentId}`, {
    componentCode,
  });
}
