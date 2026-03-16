import api from "../config/api";

export async function createISODrawing(formData) {
  return await api.post("/isoDrawing/create", formData);
}

export async function getISODrawings({
  pipelineId,
  cursor,
  prevCursor,
  limit,
  search,
  searchBy,
  startDate,
  endDate,
}) {
  const queryParams = new URLSearchParams();

  if (pipelineId) {
    queryParams.append("pipelineId", pipelineId);
  }
  if (cursor) {
    queryParams.append("cursor", cursor);
  }
   if (prevCursor) {
    queryParams.append("prevCursor", prevCursor);
  }
  if (limit) {
    queryParams.append("limit", limit);
  }
  if (search) {
    queryParams.append("search", search);
  }
  if (searchBy) {
    queryParams.append("searchBy", searchBy);
  }
  if (startDate) {
    queryParams.append("startDate", startDate);
  }
  if (endDate) {
    queryParams.append("endDate", endDate);
  }

  const response = await api.get(
    `/isoDrawing/getAllIsoDrawings?${queryParams.toString()}`
  );

  // Backend now responds with:
  // { pagination: { hasNextPage, nextCursor, prevCursor, limit }, count, isoDrawings }
  return response;
}

export async function rejectISODrawing({ isoDrawingId, remarks, revision }) {
  return await api.patch("/isoDrawing/reject", {
    isoDrawingId,
    remarks,
    revision,
  });
}

export async function sendRevision(formData) {
  return await api.patch("/isoDrawing/revisionResponse", formData);
}

export async function approveISODrawing({ isoDrawingId, approvedDate }) {
  return await api.patch("/isoDrawing/approve", { isoDrawingId, approvedDate });
}
