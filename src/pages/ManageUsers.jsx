import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UsersForm } from "@/components/users/UsersForm";
import { UsersTable } from "@/components/users/UsersTable";
import { useAuthStore } from "../store/authStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const genId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
};

const ManageUsers = () => {
  const user = useAuthStore((state) => state.user);
  const canManageUsers = user?.role === "super-admin";

  const [users, setUsers] = useState([]);

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
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id !== editingUser.id) return u;

          // Enforce username uniqueness (if username changed)
          const prevNormalized = (editingUser.username || "")
            .toLowerCase()
            .trim();
          if (
            normalizedUsername !== prevNormalized &&
            usernamesSet.has(normalizedUsername)
          ) {
            toast.error("Username already exists.");
            return u;
          }

          // Password: only change if provided (UsersForm omits it when blank)
          const next = { ...u, ...payload };
          if (!payload.password) {
            delete next.password;
            return { ...u, ...payload };
          }
          return next;
        })
      );

      setMode("idle");
      setEditingUser(null);
      toast.success("User updated.");
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

    const newUser = {
      id: genId(),
      username: payload.username.trim(),
      password: payload.password,
      fullName: payload.fullName.trim(),
      email: payload.email?.trim() || "",
      phoneNumber: payload.phoneNumber?.trim() || "",
      employeeId: payload.employeeId.trim(),
      department: payload.department.trim(),
      role: payload.role.trim(),
      permissions: payload.permissions,
    };

    setUsers((prev) => [newUser, ...prev]);
    setMode("idle");
    setEditingUser(null);
    toast.success("User created.");
  };

  const confirmDelete = () => {
    if (!canManageUsers) {
      toast.error("You are not allowed to manage users.");
      return;
    }
    if (!userToDelete) return;

    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    toast.success("User deleted.");
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
                className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700 disabled:bg-gray-400"
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

        <UsersTable
          users={users}
          canManage={canManageUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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