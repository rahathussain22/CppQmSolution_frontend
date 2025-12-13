import { useState } from "react";
import { WPSForm } from "@/components/wps/WPSForm";
import { WPSTable } from "@/components/wps/WPSTable";
import {
  useGetWPSQuery,
  useCreateWPSMutation,
  useDeleteWPSMutation,
} from "../../hooks/useWPS";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function WPS() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingWPS, setEditingWPS] = useState(null);
  const [selectedWPS, setSelectedWPS] = useState(null);

  const { data: wpsList = [], isLoading, error } = useGetWPSQuery({});

  const createWPSMutation = useCreateWPSMutation();
  const deleteWPSMutation = useDeleteWPSMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wpsToDelete, setWpsToDelete] = useState(null);

  const handleAdd = () => {
    setEditingWPS(null);
    setMode("adding");
  };

  const handleEdit = (wps) => {
    setEditingWPS(wps);
    setMode("editing");
  };

  const handleSave = (formData) => {
    createWPSMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wps"] });
        setMode("idle");
        setEditingWPS(null);
        toast.success("WPS has been saved.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save WPS.");
      },
    });
  };

  const handleCancel = () => {
    setEditingWPS(null);
    setMode("idle");
  };

  const handleDelete = (wps) => {
    setWpsToDelete(wps);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (wpsToDelete) {
      deleteWPSMutation.mutate(
        { wpsId: wpsToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wps"] });
            setDeleteDialogOpen(false);
            setWpsToDelete(null);
            toast.success("WPS has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete WPS.");
            setDeleteDialogOpen(false);
            setWpsToDelete(null);
          },
        }
      );
    }
  };

  const handleSelectWPS = (wps) => {
    setSelectedWPS(wps);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">WPS Management</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add WPS
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <WPSForm
            wps={editingWPS}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createWPSMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading WPS records...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading WPS records: {error.message}
          </div>
        ) : (
          <WPSTable
            wpsList={wpsList}
            selectedWPS={selectedWPS}
            onEdit={handleEdit}
            onSelectWPS={handleSelectWPS}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete WPS</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the WPS "{wpsToDelete?.wpsTitle}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteWPSMutation.isPending}
            >
              {deleteWPSMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
