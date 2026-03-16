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
    select: (response) => {
      // Normalize response shape: { rfis, pagination, count }
      if (response?.rfis) {
        return {
          rfis: response.rfis,
          pagination: response.pagination || null,
          count: response.count ?? null,
        };
      }

      const data = response?.data || response?.results || response || {};
      return {
        rfis: data.rfis || data || [],
        pagination: data.pagination || null,
        count: data.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
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
