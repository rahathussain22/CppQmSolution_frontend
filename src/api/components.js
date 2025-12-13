import api from "../config/api";

export async function createComponent({
  componentType,
  componentCode,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
  projectId,
}) {
  return await api.post("/component/addComponent", {
    componentType,
    componentCode,
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
    `/component/getAllComponent?${queryParams.toString()}`
  );
  return response;
}

export async function updateComponent({
  componentId,
  componentType,
  componentCode,
  material,
  diameter,
  length,
  thickness,
  pipeNumber,
  heatNumber,
  projectId,
}) {
  return await api.put("/component/updateComponent", {
    componentId,
    componentType,
    componentCode,
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
  return await api.delete("/component/deleteComponent", {
    componentId,
    componentCode,
  });
}
