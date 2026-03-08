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
    `/fitup/get-cssp-w-001-daily-report?${queryParams.toString()}`
  );

  // Expected shape: { message: string; fileUrl: string; data: any }
  return response;
}

