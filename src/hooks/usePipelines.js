import { useQuery } from "@tanstack/react-query";

import { getPipelines } from "../api/pipelines";

export function usePipelines() {
  return useQuery({
    queryKey: ["pipelines"],
    queryFn: getPipelines,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response) => response.pipelines || response.data || response.results || [],
  });
}