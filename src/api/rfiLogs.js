import api from "../config/api";

export async function createRFILog({
  rfiNumber,
  discipline,
  itpNumber,
  reportNumber,
  description,
  location,
  inspectionLevel,
  drawingNumber,
  dateOfInspection,
  timeOfInspection,
  qc,
  pmt,
  remarks,
  status,
  companyInspectionLevel,
  companyQC,
}) {
  return await api.post("/rfi/create", {
    rfiNumber,
    discipline,
    itpNumber,
    reportNumber,
    description,
    location,
    inspectionLevel,
    drawingNumber,
    dateOfInspection,
    timeOfInspection,
    qc,
    pmt,
    remarks,
    status,
    companyInspectionLevel,
    companyQC,
  });
}

export async function getRFILogs({ projectCode, discipline, status } = {}) {
  const queryParams = new URLSearchParams();
  if (projectCode) queryParams.append("projectCode", projectCode);
  if (discipline) queryParams.append("discipline", discipline);
  if (status) queryParams.append("status", status);
  const response = await api.get(`/rfi/get?${queryParams.toString()}`);
  return response;
}

export async function updateRFILog(formData, id) {
  // Accept FormData or regular object
  return await api.patch(`/rfi/update/${id}`, formData);
}

export async function bulkCreateRFILog(file) {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/rfi/bulkCreate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteRFILog({ id }) {
  return await api.delete(`/rfi/delete/${id}`);
}

export async function generateRFILogForm({ id }) {
  return await api.post("/rfi/generateForm", { id });
}
