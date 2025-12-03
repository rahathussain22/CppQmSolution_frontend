import api from "../config/api";

export async function createISODrawing(formData) {
  return await api.post("/isoDrawing/create", formData);
}

export async function getISODrawings({ pipelineId }) {
  const queryParams = new URLSearchParams();
  if (pipelineId) {
    queryParams.append("projectId", pipelineId);
  }

  const response = await api.get(
    `/isoDrawing/getAllIsoDrawings?${queryParams.toString()}`
  );
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
