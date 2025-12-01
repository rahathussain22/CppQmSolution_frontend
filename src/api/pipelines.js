import api from "../config/api";

export async function createPipeline({
  projectId,
  lotId,
  lineNumber,
  lineSize,
  lineClass,
  location,
}) {
  return await api.post("/pipeline/create", {
    projectId,
    lotId,
    lineNumber,
    lineSize,
    lineClass,
    location,
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
