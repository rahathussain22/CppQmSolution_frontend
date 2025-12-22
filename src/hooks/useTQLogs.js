// src/hooks/useTQLogs.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTQLogs,
  createTQLog,
  updateTQLog,
  deleteTQLog,
} from "../api/tqLogs";

export const useTQLogs = () => {
  return useQuery({
    queryKey: ["tqLogs"],
    queryFn: () => getTQLogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateTQLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTQLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
    },
  });
};

export const useUpdateTQLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTQLog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
    },
  });
};

export const useDeleteTQLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTQLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
    },
  });
};
