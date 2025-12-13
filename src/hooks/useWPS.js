import { useQuery, useMutation } from "@tanstack/react-query";

import { getWPS, createWPS, deleteWPS } from "../api/wps";

export function useGetWPSQuery({ projectId } = {}) {
  return useQuery({
    queryKey: ["wps", projectId],
    queryFn: () => getWPS({ projectId }),
    select: (response) =>
      response.wps || response.data || response.results || [],
    refetchOnWindowFocus: false,
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
