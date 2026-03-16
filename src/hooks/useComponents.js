import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createComponent,
  getComponents,
  updateComponent,
  deleteComponent,
} from "../api/components";

export function useGetComponentsQuery(params = {}) {
  return useQuery({
    queryKey: ["components", params],
    queryFn: () => getComponents(params),
    select: (response) => {
      // Backend already returns plain object: { data, pagination, count }
      if (!response) return { data: [], pagination: null, count: null };
      const raw = response;
      return {
        data: raw.data || [],
        pagination: raw.pagination || null,
        count: raw.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useCreateComponentMutation() {
  return useMutation({
    mutationFn: createComponent,
  });
}

export function useUpdateComponentMutation() {
  return useMutation({
    mutationFn: updateComponent,
  });
}

export function useDeleteComponentMutation() {
  return useMutation({
    mutationFn: deleteComponent,
  });
}
