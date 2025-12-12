import api from "../config/api";

export async function createSpool({
  spoolNumber,
  description,
  type,
  weight,
  isActive,
  isoDrawingId,
  pipelineId,
}) {
  return await api.post("/spool/create", {
    spoolNumber,
    description,
    type,
    weight,
    isActive,
    isoDrawingId,
    pipelineId,
  });
}

export async function getSpools({ isoDrawingId, pipelineId }) {
  const queryParams = new URLSearchParams();
  if (isoDrawingId) queryParams.append("isoDrawingId", isoDrawingId);
  if (pipelineId) queryParams.append("pipelineId", pipelineId);

  const response = await api.get(`/spool/getSpools?${queryParams.toString()}`);
  return response;
}

export async function deleteSpool({ spoolId }) {
  return await api.delete(`/spool/delete/${spoolId}`);
}
