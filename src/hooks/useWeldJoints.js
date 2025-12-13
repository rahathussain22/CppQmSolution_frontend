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
    select: (data) => (data && data.weldJoints) || [],
    refetchOnWindowFocus: false,
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
