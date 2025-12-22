// src/hooks/useNCRLogs.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNCRLogs,
  createNCRLog,
  updateNCRLog,
  deleteNCRLog,
} from "../api/ncrLogs";

export const useNCRLogs = () => {
  return useQuery({
    queryKey: ["ncrLogs"],
    queryFn: () => getNCRLogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateNCRLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNCRLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
    },
  });
};

export const useUpdateNCRLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateNCRLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
    },
  });
};

export const useDeleteNCRLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNCRLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
    },
  });
};
