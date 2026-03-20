import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDatabase,
  createDatabase,
  updateDatabase,
  deleteDatabase,
} from "../api/master-database";

export function useGetMasterDatabaseQuery(params = {}) {
  return useQuery({
    queryKey: ["masterDatabase", params],
    queryFn: () => getDatabase(params),
    select: (response) => {
      const data = response?.data || response?.results || response || {};
      return {
        data: data.data || data || [],
        pagination: data.pagination || null,
        count: data.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useCreateMasterDatabaseMutation() {
  return useMutation({
    mutationFn: createDatabase,
  });
}

export function useUpdateMasterDatabaseMutation() {
  return useMutation({
    mutationFn: async ({ id, payload }) => updateDatabase(id, payload),
  });
}

export function useDeleteMasterDatabaseMutation() {
  return useMutation({
    mutationFn: async ({ id }) => deleteDatabase(id),
  });
}

