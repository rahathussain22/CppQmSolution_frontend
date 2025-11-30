import api from "../config/api";

export async function createProject({
  projectCode,
  name,
  clientName,
  location,
  startDate,
  cuttOffDate,
  adminId,
}) {
  return await api.post("/project/createProject", {
    projectCode,
    name,
    clientName,
    location,
    startDate,
    cuttOffDate,
    userId: adminId,
  });
}

export async function getProjects() {
  const response = await api.get(`/project/getAllProjects`);
  return response;
}

export async function deleteProject({ projectCode, adminId }) {
  return await api.post("/project/deleteProject", {
    projectCode,
    userId: adminId,
  });
}
