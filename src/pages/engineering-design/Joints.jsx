import { useState } from "react";
import { WeldJointForm } from "../../components/joints/jointForm";
import { JointTable } from "../../components/joints/jointTable";
// import SpoolsSection from "@/components/iso-drawings/SpoolsSection";
import { createWeldJoint, getWeldJoints } from "@/api/joints"; // updated API
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import ComponentsSection from "../../components/joints/ComponentsSection";
export default function Joints() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingJoint, setEditingJoint] = useState(null);
  const [selectedJoint, setSelectedJoint] = useState(null);

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

  const createJointMutation = useMutation({
    mutationFn: (data) => createWeldJoint(data),
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

  const handleAdd = () => {
    setEditingJoint(null);
    setMode("adding");
  };

  const handleEdit = (joint) => {
    setEditingJoint(joint);
    setMode("editing");
  };

  const handleSave = (formData) => {
    createJointMutation.mutate(formData);
  };

  const handleCancel = () => {
    setEditingJoint(null);
    setMode("idle");
  };

  const handleSelectJoint = (joint) => {
    setSelectedJoint(joint);
    setMode("idle");
  };

  return (
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
          isSaving={createJointMutation.isPending}
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
          onSelectJoint={handleSelectJoint}
          ComponentsSection={ComponentsSection}
        />
      )}
    </div>
  );
}
