import { useQuery, useMutation } from "@tanstack/react-query";
import { createWelder, getWelders, deleteWelder } from "../api/welder";

export function useGetWelderQuery(params = {}) {
  return useQuery({
    queryKey: ["welders", params],
    queryFn: () => getWelders(params),
    select: (data) => (data && data.welders) || [],
    refetchOnWindowFocus: false,
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
