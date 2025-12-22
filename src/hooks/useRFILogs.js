import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createRFILog,
  getRFILogs,
  updateRFILog,
  deleteRFILog,
} from "../api/rfiLogs";

export function useGetRFILogsQuery(params = {}) {
  return useQuery({
    queryKey: ["rfiLogs", params],
    queryFn: () => getRFILogs(params),
    select: (data) => (data && data.data) || [],
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
    mutationFn: updateRFILog,
  });
}

export function useDeleteRFILogMutation() {
  return useMutation({
    mutationFn: deleteRFILog,
  });
}
