import { useState } from "react";
import { WelderForm } from "@/components/welder/WelderForm";
import { WelderTable } from "@/components/welder/WelderTable";
import {
  useGetWelderQuery,
  useCreateWelderMutation,
  useDeleteWelderMutation,
} from "../../hooks/useWelder";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Welder() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingWelder, setEditingWelder] = useState(null);
  const [selectedWelder, setSelectedWelder] = useState(null);

  const { data: welderList = [], isLoading, error } = useGetWelderQuery({});

  const createWelderMutation = useCreateWelderMutation();
  const deleteWelderMutation = useDeleteWelderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [welderToDelete, setWelderToDelete] = useState(null);

  const handleAdd = () => {
    setEditingWelder(null);
    setMode("adding");
  };

  const handleEdit = (welder) => {
    setEditingWelder(welder);
    setMode("editing");
  };

  const handleSave = (formData) => {
    createWelderMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["welders"] });
        setMode("idle");
        setEditingWelder(null);
        toast.success("Welder has been saved.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save welder.");
      },
    });
  };

  const handleCancel = () => {
    setEditingWelder(null);
    setMode("idle");
  };

  const handleDelete = (welder) => {
    setWelderToDelete(welder);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (welderToDelete) {
      deleteWelderMutation.mutate(
        { welderId: welderToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["welders"] });
            setDeleteDialogOpen(false);
            setWelderToDelete(null);
            toast.success("Welder has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete welder.");
            setDeleteDialogOpen(false);
            setWelderToDelete(null);
          },
        }
      );
    }
  };

  const handleSelectWelder = (welder) => {
    setSelectedWelder(welder);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Welder Management</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add Welder
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <WelderForm
            welder={editingWelder}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createWelderMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading welder records...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading welder records: {error.message}
          </div>
        ) : (
          <WelderTable
            welderList={welderList}
            selectedWelder={selectedWelder}
            onEdit={handleEdit}
            onSelectWelder={handleSelectWelder}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Welder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the welder "{welderToDelete?.name}
              "? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteWelderMutation.isPending}
            >
              {deleteWelderMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
