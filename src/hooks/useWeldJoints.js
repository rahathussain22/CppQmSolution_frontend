import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createWeldJoint,
  getWeldJoints,
  updateWeldJoint,
  deleteWeldJoint,
  attachWeldJointComponents,
  detachWeldJointComponents,
} from "../api/joints";

export function useGetWeldJointsQuery(params = {}) {
  return useQuery({
    queryKey: ["weldJoints", params],
    queryFn: () => getWeldJoints(params),
    select: (response) => {
      // Normalize: { weldJoints, pagination, count }
      if (!response) return { weldJoints: [], pagination: null, count: null };
      const raw = response;
      return {
        weldJoints: raw.weldJoints || [],
        pagination: raw.pagination || null,
        count: raw.count ?? null,
      };
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useCreateWeldJointMutation() {
  return useMutation({
    mutationFn: createWeldJoint,
  });
}

export function useUpdateWeldJointMutation() {
  return useMutation({
    mutationFn: updateWeldJoint,
  });
}

export function useDeleteWeldJointMutation() {
  return useMutation({
    mutationFn: deleteWeldJoint,
  });
}

export function useAttachWeldJointComponentsMutation() {
  return useMutation({
    mutationFn: attachWeldJointComponents,
  });
}

export function useDetachWeldJointComponentsMutation() {
  return useMutation({
    mutationFn: detachWeldJointComponents,
  });
}
