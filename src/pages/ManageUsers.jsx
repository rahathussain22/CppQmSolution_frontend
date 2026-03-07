import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UsersForm } from "@/components/users/UsersForm";
import { UsersTable } from "@/components/users/UsersTable";
import { useAuthStore } from "../store/authStore";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/hooks/useUsers";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const canManageUsers = user?.role === "super admin";

  // Server data
  const {
    data: users = [],
    isLoading,
    error,
  } = useGetUsersQuery({});
  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  // Form modes: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingUser, setEditingUser] = useState(null);

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const isEditing = mode === "editing";

  const usernamesSet = useMemo(
    () => new Set(users.map((u) => (u.username || "").toLowerCase().trim())),
    [users]
  );

  // Guard: only super-admin / all-permissions users can access this module
  if (!canManageUsers) {
    return <Navigate to={"/home"} />;
  }

  const handleAdd = () => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }
    setEditingUser(null);
    setMode("adding");
  };

  const handleEdit = (u) => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }
    setEditingUser(u);
    setMode("editing");
  };

  const handleDelete = (u) => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }
    setUserToDelete(u);
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setMode("idle");
  };

  const handleSave = (payload) => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }

    // Basic validation (form already enforces most, this is a last safety net)
    if (!payload?.username?.trim()) {
      toast.error("Username is required.");
      return;
    }
    if (!payload?.fullName?.trim()) {
      toast.error("Full Name is required.");
      return;
    }
    if (!payload?.employeeId?.trim()) {
      toast.error("Employee ID is required.");
      return;
    }
    if (!payload?.department?.trim()) {
      toast.error("Department is required.");
      return;
    }
    if (!payload?.role?.trim()) {
      toast.error("Role is required.");
      return;
    }
    if (!payload?.permissions?.trim()) {
      toast.error("Permissions is required.");
      return;
    }

    const normalizedUsername = payload.username.toLowerCase().trim();

    if (isEditing && editingUser) {
      // Enforce username uniqueness (if username changed)
      const prevNormalized = (editingUser.username || "")
        .toLowerCase()
        .trim();
      if (
        normalizedUsername !== prevNormalized &&
        usernamesSet.has(normalizedUsername)
      ) {
        toast.error("Username already exists.");
        return;
      }

      const updatePayload = {
        id: editingUser.id,
        username: payload.username.trim(),
        fullName: payload.fullName.trim(),
        email: payload.email?.trim() || "",
        phoneNumber: payload.phoneNumber?.trim() || "",
        employeeId: payload.employeeId.trim(),
        department: payload.department.trim(),
        role: payload.role.trim(),
        permissions: payload.permissions,
      };

      if (payload.password?.trim()) {
        updatePayload.password = payload.password.trim();
      }

      updateUserMutation.mutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setMode("idle");
          setEditingUser(null);
          toast.success("User updated.");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to update user.");
        },
      });

      return;
    }

    // Create
    if (!payload?.password?.trim()) {
      toast.error("Password is required for new users.");
      return;
    }
    if (usernamesSet.has(normalizedUsername)) {
      toast.error("Username already exists.");
      return;
    }

    const createPayload = {
      username: payload.username.trim(),
      password: payload.password.trim(),
      fullName: payload.fullName.trim(),
      email: payload.email?.trim() || "",
      phoneNumber: payload.phoneNumber?.trim() || "",
      employeeId: payload.employeeId.trim(),
      department: payload.department.trim(),
      role: payload.role.trim(),
      permissions: payload.permissions,
    };

    createUserMutation.mutate(createPayload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setMode("idle");
        setEditingUser(null);
        toast.success("User created.");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to create user.");
      },
    });
  };

  const confirmDelete = () => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }
    if (!userToDelete) return;

    deleteUserMutation.mutate(
      { id: userToDelete.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setDeleteDialogOpen(false);
          setUserToDelete(null);
          toast.success("User deleted.");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to delete user.");
        },
      }
    );
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Manage Users</h4>
          <div className="flex gap-2">
            {canManageUsers && (
              <Button
                onClick={handleAdd}
                disabled={mode !== "idle"}
                className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black disabled:bg-gray-400"
              >
                + Add User
              </Button>
            )}
          </div>
        </div>

        {(mode === "adding" || mode === "editing") && (
          <UsersForm
            user={editingUser}
            isEditing={mode === "editing"}
            isSaving={false}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {isLoading ? (
          <div className="p-4 text-gray-600">Loading users...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading users: {error.message}
          </div>
        ) : (
          <UsersTable
            users={users}
            canManage={canManageUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete user "{userToDelete?.username}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageUsers;