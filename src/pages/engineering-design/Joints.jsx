import { useState } from "react";
import { WeldJointForm } from "@/components/joints/jointForm";
import { JointTable } from "@/components/joints/jointTable";
// import SpoolsSection from "@/components/iso-drawings/SpoolsSection";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import ComponentsSection from "../../components/joints/ComponentsSection";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGetWeldJointsQuery,
  useCreateWeldJointMutation,
  useUpdateWeldJointMutation,
  useDeleteWeldJointMutation,
} from "../../hooks/useWeldJoints";

export default function Joints() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingJoint, setEditingJoint] = useState(null);
  const [, setSelectedJoint] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jointToDelete, setJointToDelete] = useState(null);

  const { data: joints = [], isLoading, error } = useGetWeldJointsQuery({});

  const createJointMutation = useCreateWeldJointMutation();
  const updateJointMutation = useUpdateWeldJointMutation();
  const deleteJointMutation = useDeleteWeldJointMutation();

  const handleAdd = () => {
    setEditingJoint(null);
    setMode("adding");
  };

  const handleEdit = (joint) => {
    setEditingJoint(joint);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingJoint) {
      updateJointMutation.mutate(
        { weldJointId: editingJoint.id, formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
            setMode("idle");
            setEditingJoint(null);
            toast.success("Weld Joint has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update Weld Joint.");
          },
        }
      );
    } else {
      createJointMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
          setMode("idle");
          setEditingJoint(null);
          toast.success("Weld Joint has been saved.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to save Weld Joint.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingJoint(null);
    setMode("idle");
  };

  const handleSelectJoint = (joint) => {
    setSelectedJoint(joint);
    setMode("idle");
  };

  const handleDelete = (joint) => {
    setJointToDelete(joint);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (jointToDelete) {
      deleteJointMutation.mutate(
        { weldJointId: jointToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
            setDeleteDialogOpen(false);
            setJointToDelete(null);
            toast.success("Weld Joint has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete Weld Joint.");
            setDeleteDialogOpen(false);
            setJointToDelete(null);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Weld Joints</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add Weld Joint
            </Button>
          )}
        </div>

        {(mode === "adding" || mode === "editing") && (
          <WeldJointForm
            joint={editingJoint}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createJointMutation.isPending || updateJointMutation.isPending
            }
          />
        )}

        {isLoading ? (
          <div className="p-4 text-gray-600">Loading Weld Joints...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading Weld Joints: {error.message}
          </div>
        ) : (
          <JointTable
            joints={joints}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelectJoint={handleSelectJoint}
            ComponentsSection={ComponentsSection}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Weld Joint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the Weld Joint "
              {jointToDelete?.weldNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteJointMutation.isPending}
            >
              {deleteJointMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
