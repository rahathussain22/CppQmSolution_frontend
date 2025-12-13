import { useState } from "react";
import { ComponentForm } from "@/components/components/ComponentForm";
import { ComponentTable } from "@/components/components/ComponentTable";
import {
  useGetComponentsQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
} from "../../hooks/useComponents";
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

export default function Components() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingComponent, setEditingComponent] = useState(null);

  const {
    data: componentList = [],
    isLoading,
    error,
  } = useGetComponentsQuery({});

  const createComponentMutation = useCreateComponentMutation();
  const updateComponentMutation = useUpdateComponentMutation();
  const deleteComponentMutation = useDeleteComponentMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState(null);

  const handleAdd = () => {
    setEditingComponent(null);
    setMode("adding");
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingComponent) {
      updateComponentMutation.mutate(
        { ...formData, componentId: editingComponent.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["components"] });
            setMode("idle");
            setEditingComponent(null);
            toast.success("Component has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update component.");
          },
        }
      );
    } else {
      createComponentMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["components"] });
          setMode("idle");
          setEditingComponent(null);
          toast.success("Component has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create component.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingComponent(null);
    setMode("idle");
  };

  const handleDelete = (component) => {
    setComponentToDelete(component);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      deleteComponentMutation.mutate(
        {
          componentId: componentToDelete.id,
          componentCode: componentToDelete.componentCode,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["components"] });
            setDeleteDialogOpen(false);
            setComponentToDelete(null);
            toast.success("Component has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete component.");
            setDeleteDialogOpen(false);
            setComponentToDelete(null);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Components</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add Component
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <ComponentForm
            component={editingComponent}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createComponentMutation.isPending ||
              updateComponentMutation.isPending
            }
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading components...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading components: {error.message}
          </div>
        ) : (
          <ComponentTable
            componentList={componentList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Component</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the component "
              {componentToDelete?.componentCode}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteComponentMutation.isPending}
            >
              {deleteComponentMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
