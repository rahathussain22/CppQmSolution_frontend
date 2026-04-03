import { useQuery, useMutation } from "@tanstack/react-query";

import { getWPS, createWPS, deleteWPS } from "../api/wps";

export function useGetWPSQuery(params = {}) {
  return useQuery({
    queryKey: ["wps", params],
    queryFn: () => getWPS(params),
    select: (response) => {
      // Normalize: { wps, pagination, count }
      if (response.wps.length === 0) return { wps: [], pagination: null, count: null };
      const raw = response;
      return {
        wps: raw.wps || [],
        pagination: raw.pagination || null,
        count: raw.count ?? null,
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
