import api from "../config/api";

export async function createLot({
  projectId,
  projectCode,
  lotCode,
  name,
  description,
  startDate,
  cuttOffDate,
  status,
  modifiedBy,
}) {
  return await api.post("/lot/createLot", {
    projectId,
    projectCode,
    lotCode,
    name,
    description,
    startDate,
    cuttOffDate,
    status,
    modifiedBy,
  });
}

export async function getLots({ projectId }) {
  const queryParams = new URLSearchParams();
  if (projectId) {
    queryParams.append("projectId", projectId);
  }
  const response = await api.get(`/lot/getAllLots?${queryParams.toString()}`);
  return response;
}

export async function deleteLot({ lotId, adminId }) {
  return await api.delete("/lot/deleteLot", { lotId, adminId });
}
