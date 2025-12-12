import api from "../config/api";

export async function createPipeline({
  projectId,
  lotCode,
  name,
  description,
  startDate,
  cuttOffDate,
  lineNumber,
  lineSize,
  lineClass,
  location,
  status,
}) {
  return await api.post("/pipeline/create", {
    projectId,
    lotCode,
    name,
    description,
    startDate,
    cuttOffDate,
    lineNumber,
    lineSize,
    lineClass,
    location,
    status,
  });
}

export async function getPipelines({ projectId, lotId }) {
  const queryParams = new URLSearchParams();
  if (projectId) {
    queryParams.append("projectId", projectId);
  }
  if (lotId) {
    queryParams.append("lotId", lotId);
  }
  const response = await api.get(
    `/pipeline/getAllPipelines?${queryParams.toString()}`
  );
  return response;
}

export async function deletePipeline({ pipelineId }) {
  return await api.delete("/pipeline/delete", { pipelineId });
}
