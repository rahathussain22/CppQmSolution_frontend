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

export async function getWelders({ projectId, welderId }) {
  const queryParams = new URLSearchParams();
  if (projectId) queryParams.append("projectId", projectId);
  if (welderId) queryParams.append("welderId", welderId);

  const response = await api.get(
    `/welder/getWelders?${queryParams.toString()}`
  );
  return response;
}

export async function deleteWelder({ welderId }) {
  return await api.delete(`/welder/delete/${welderId}`);
}
