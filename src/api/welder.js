import api from "../config/api";

export async function createWelder({
  projectId,
  stampNumber,
  name,
  employeeId,
  company,
  nationality,
  passportNumber,
  contactNumber,
  qualificationDate,
  expiryDate,
  status,
}) {
  return await api.post("/welder/create", {
    projectId,
    stampNumber,
    name,
    employeeId,
    company,
    nationality,
    passportNumber,
    contactNumber,
    qualificationDate,
    expiryDate,
    status,
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
