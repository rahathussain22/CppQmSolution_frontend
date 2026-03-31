import { useQuery, useMutation } from "@tanstack/react-query";
import { createWelder, getWelders, deleteWelder, createBulkWelders, updateWelder } from "../api/welder";

export function useGetWelderQuery(params = {}) {
  return useQuery({
    queryKey: ["welders", params],
    queryFn: () => getWelders(params),
    select: (response) => {
      // Normalize: { welders, pagination, count }
      if (response.welders.length === 0) return { welders: [], pagination: null, count: null };
      const raw = response;
      return {
        welders: raw.welders || [],
        pagination: raw.pagination || null,
        count: raw.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useCreateWelderMutation() {
  return useMutation({
    mutationFn: createWelder,
  });
}

export function useDeleteWelderMutation() {
  return useMutation({
    mutationFn: deleteWelder,
  });
}


export function useCreateBulkWeldersMutation() {
  return useMutation({
    mutationFn: createBulkWelders,
  });
}

export function useUpdateWelderMutation() {
  return useMutation({
    mutationFn: updateWelder,
  });
}