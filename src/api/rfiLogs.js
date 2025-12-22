import api from "../config/api";

export async function createRFILog({
  cppRFINo,
  rfiNo,
  projectCode,
  descipline,
  itpNumber,
  reportNumber,
  description,
  location,
  inspectionOfficerName,
  inspectionLevel,
  companyInspectionLevel,
  drawingNumber,
  inspectionDate,
  inspectionTime,
  cppQc,
  companyQc,
  pmt,
  rfiStatus,
  remarks,
}) {
  return await api.post("/rfi/createRFI", {
    cppRFINo,
    rfiNo,
    projectCode,
    descipline,
    itpNumber,
    reportNumber,
    description,
    location,
    inspectionOfficerName,
    inspectionLevel,
    companyInspectionLevel,
    drawingNumber,
    inspectionDate,
    inspectionTime,
    cppQc,
    companyQc,
    pmt,
    rfiStatus,
    remarks,
  });
}

export async function getRFILogs({ projectCode, descipline, rfiStatus }) {
  const queryParams = new URLSearchParams();
  if (projectCode) queryParams.append("projectCode", projectCode);
  if (descipline) queryParams.append("descipline", descipline);
  if (rfiStatus) queryParams.append("rfiStatus", rfiStatus);
  const response = await api.get(`/rfi/getRFILogs?${queryParams.toString()}`);
  return response;
}

export async function updateRFILog({
  cppRFINo,
  rfiNo,
  projectCode,
  descipline,
  itpNumber,
  reportNumber,
  description,
  location,
  inspectionOfficerName,
  inspectionLevel,
  companyInspectionLevel,
  drawingNumber,
  inspectionDate,
  inspectionTime,
  cppQc,
  companyQc,
  pmt,
  rfiStatus,
  remarks,
}) {
  return await api.put(`/rfi/updateRFI/${cppRFINo}`, {
    cppRFINo,
    rfiNo,
    projectCode,
    descipline,
    itpNumber,
    reportNumber,
    description,
    location,
    inspectionOfficerName,
    inspectionLevel,
    companyInspectionLevel,
    drawingNumber,
    inspectionDate,
    inspectionTime,
    cppQc,
    companyQc,
    pmt,
    rfiStatus,
    remarks,
  });
}

export async function deleteRFILog({ cppRFINo }) {
  return await api.delete(`/rfi/deleteRFI/${cppRFINo}`);
}
