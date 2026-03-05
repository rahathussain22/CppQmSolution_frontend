import { useQuery, useMutation } from "@tanstack/react-query";
import { createUser, getUsers, updateUser, deleteUser } from "../api/users";

export function useGetUsersQuery(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    select: (data) =>
      (data && (data.users || data.data || data.results)) || [],
    refetchOnWindowFocus: false,
  });
}

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: createUser,
  });
}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: updateUser,
  });
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: deleteUser,
  });
}

