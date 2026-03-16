import { useQuery, useMutation } from "@tanstack/react-query";

import { getWPS, createWPS, deleteWPS } from "../api/wps";

export function useGetWPSQuery(params = {}) {
  return useQuery({
    queryKey: ["wps", params],
    queryFn: () => getWPS(params),
    select: (response) => {
      // Normalize: { wps, pagination, count }
      if (!response) return { wps: [], pagination: null, count: null };
      return {
        wps: response.wps || [],
        pagination: response.pagination || null,
        count: response.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useCreateWPSMutation() {
  return useMutation({
    mutationFn: createWPS,
  });
}

export function useDeleteWPSMutation() {
  return useMutation({
    mutationFn: deleteWPS,
  });
}
