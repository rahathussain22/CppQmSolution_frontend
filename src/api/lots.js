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

export async function getLots() {
  const response = await api.get(`/lot/getAllLots`);
  return response;
}

export async function deleteLot({ lotId, adminId }) {
  return await api.delete("/lot/deleteLot", { lotId, adminId });
}
