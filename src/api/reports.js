import api from "../config/api";

export async function getDailyFitUpInspectionReport({
  drawingNumber,
  sheetNumber,
  weldNumber,
}) {
  const queryParams = new URLSearchParams();

  if (drawingNumber) queryParams.append("drawingNumber", drawingNumber);
  if (sheetNumber) queryParams.append("sheetNumber", sheetNumber);
  if (weldNumber) queryParams.append("weldNumber", weldNumber);

  const response = await api.get(
    `/fitup/get-ir-cssp-w-001?${queryParams.toString()}`
  );

  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}

export async function getWeldSummaryNDTTrackingReport({
  drawingNumber,
  sheetNumber,
  weldNumber,
}) {
  const queryParams = new URLSearchParams();

  if (drawingNumber) queryParams.append("drawingNumber", drawingNumber);
  if (sheetNumber) queryParams.append("sheetNumber", sheetNumber);
  if (weldNumber) queryParams.append("weldNumber", weldNumber);

  const response = await api.get(
    `/fitup/get-ir-cssp-w-002?${queryParams.toString()}`
  );

  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}

export async function getWelderProgressStatusReport() {
  const response = await api.get(`/fitup/get-ir-cssp-w-003`);
  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}

export async function getWeldVisualInspectionReport() {
  const response = await api.get(`/fitup/get-ir-cssp-w-004`);
  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}

export async function getNDTSummaryReport() {
  const response = await api.get(`/fitup/get-ir-cssp-w-005`);
  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}
