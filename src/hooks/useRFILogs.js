import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createRFILog,
  getRFILogs,
  updateRFILog,
  deleteRFILog,
  bulkCreateRFILog,
  generateRFILogForm,
} from "../api/rfiLogs";

export function useGetRFILogsQuery(params = {}) {
  return useQuery({
    queryKey: ["rfiLogs", params],
    queryFn: () => getRFILogs(params),
    select: (response) =>
      response.rfis || response.data || response.results || [],
    refetchOnWindowFocus: false,
  });
}

export function useCreateRFILogMutation() {
  return useMutation({
    mutationFn: createRFILog,
  });
}

export function useUpdateRFILogMutation() {
  return useMutation({
    mutationFn: async ({ formData, id }) => updateRFILog(formData, id),
  });
}

export function useDeleteRFILogMutation() {
  return useMutation({
    mutationFn: deleteRFILog,
  });
}

export function useBulkCreateRFILogMutation() {
  return useMutation({
    mutationFn: bulkCreateRFILog,
  });
}

export function useGenerateRFILogFormMutation() {
  return useMutation({
    mutationFn: generateRFILogForm,
  });
}
