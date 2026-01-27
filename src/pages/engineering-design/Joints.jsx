import { useState } from "react";
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

// Static joints data
const STATIC_JOINTS = [
  {
    id: 1,
    weldNumber: "SW-001",
    jointType: "Butt",
    initialProduction: "IP1",
    component1Id: 1,
    component2Id: 2,
    pdfFile: null,
  },
  {
    id: 2,
    weldNumber: "FW-002",
    jointType: "Skl",
    initialProduction: "IP2",
    component1Id: 2,
    component2Id: 3,
    pdfFile: null,
  },
  {
    id: 3,
    weldNumber: "SW-003",
    jointType: "Seal",
    initialProduction: "IP1",
    component1Id: 1,
    component2Id: 4,
    pdfFile: null,
  },
];

export default function Joints() {
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingJoint, setEditingJoint] = useState(null);
  const [joints, setJoints] = useState(STATIC_JOINTS);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jointToDelete, setJointToDelete] = useState(null);

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
      setJoints(
        joints.map((j) => (j.id === editingJoint.id ? { ...j, ...formData } : j))
      );
      setMode("idle");
      setEditingJoint(null);
      toast.success("Weld Joint has been updated.");
    } else {
      const newJoint = {
        id: Math.max(...joints.map((j) => j.id), 0) + 1,
        ...formData,
      };
      setJoints([...joints, newJoint]);
      setMode("idle");
      setEditingJoint(null);
      toast.success("Weld Joint has been saved.");
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
      setJoints(joints.filter((j) => j.id !== jointToDelete.id));
      setDeleteDialogOpen(false);
      setJointToDelete(null);
      toast.success("Weld Joint has been deleted.");
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
            isSaving={false}
          />
        )}

        {joints.length > 0 ? (
          <JointTable
            joints={joints}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
