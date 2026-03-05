import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWeldJoint,
  getWeldJoints,
  updateWeldJoint,
  deleteWeldJoint,
} from "@/api/joints";
import { WeldJointForm } from "@/components/joints/JointForm";
import { JointTable } from "@/components/joints/JointTable";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Joints() {
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("idle");
  const [editingJoint, setEditingJoint] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jointToDelete, setJointToDelete] = useState(null);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  const {
    data: joints = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weldJoints"],
    queryFn: () => getWeldJoints({}),
    select: (data) => (data && data.weldJoints) || [],
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: (formData) => createWeldJoint(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
      setMode("idle");
      setEditingJoint(null);
      toast.success("Weld Joint has been saved.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save weld joint.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ weldJointId, formData }) => updateWeldJoint({ weldJointId, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
      setMode("idle");
      setEditingJoint(null);
      toast.success("Weld Joint has been updated.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update weld joint.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ weldJointId }) => deleteWeldJoint({ weldJointId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
      setDeleteDialogOpen(false);
      setJointToDelete(null);
      toast.success("Weld Joint has been deleted.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete weld joint.");
      setDeleteDialogOpen(false);
      setJointToDelete(null);
    },
  });

  const handleAdd = () => {
    setEditingJoint(null);
    setMode("adding");
  };

  const handleEdit = (joint) => {
    setEditingJoint(joint);
    setMode("editing");
  };

  const handleSave = (formData) => {
    // formData contains: weldNumber, pipelineLineNumber, jointType, initialProduction, component1Id, component2Id
    const payload = {
      weldNumber: formData.weldNumber,
      pipelineLineNumber: formData.pipelineLineNumber,
      jointType: formData.jointType,
      initialProduction: formData.initialProduction,
      components: [formData.component1Id, formData.component2Id],
    };

    if (mode === "editing" && editingJoint) {
      updateMutation.mutate({ weldJointId: editingJoint.id, formData: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleCancel = () => {
    setEditingJoint(null);
    setMode("idle");
  };

  const handleDelete = (joint) => {
    setJointToDelete(joint);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (jointToDelete) {
      deleteMutation.mutate({ weldJointId: jointToDelete.id });
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Weld Joints</h4>
          {canAdd && mode === "idle" && (
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
            isSaving={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {isLoading ? (
          <div className="p-4 text-gray-600">Loading weld joints...</div>
        ) : error ? (
          <div className="p-4 text-red-700">Error loading weld joints.</div>
        ) : joints.length > 0 ? (
          <JointTable
            joints={joints}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        ) : (
          <div className="p-4 text-gray-600">No weld joints found.</div>
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
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
