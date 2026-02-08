import api from "../config/api";

export async function createComponent({
  componentType,
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
    componentType,
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
  componentType,
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
    componentType,
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
