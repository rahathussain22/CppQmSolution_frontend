import api from "../config/api";

export async function createComponent({
  componentCode,
  name,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
  projectId,
}) {
  return await api.post("/component/add", {
    componentCode,
    name,
    material,
    diameter,
    length,
    thickness,
    pipeNumber,
    heatNumber,
    projectId,
  });
}

export async function getComponents({ projectId }) {
  const queryParams = new URLSearchParams();
  if (projectId) queryParams.append("projectId", projectId);
  const response = await api.get(
    `/component/get?${queryParams.toString()}`
  );
  return response;
}

export async function updateComponent({
  componentId,
  componentCode,
  name,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
  projectId,
}) {
  return await api.patch("/component/update", {
    componentId,
    componentCode,
    name,
    material,
    diameter,
    length,
    thickness,
    pipeNumber,
    heatNumber,
    projectId,
  });
}

export async function deleteComponent({ componentId, componentCode }) {
  return await api.delete(`/component/delete/${componentId}`, {
    componentCode,
  });
}
