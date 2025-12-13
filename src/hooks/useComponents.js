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
    select: (data) => (data && data.data) || [],
    refetchOnWindowFocus: false,
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
