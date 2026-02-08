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

// Static initial data
const INITIAL_WPS = [
  {
    id: 1,
    projectId: 1,
    projectCode: "PA-001",
    projectName: "Project Alpha",
    wpsNumber: "WPS-001",
    weldingProcess: "GMAW",
    fileName: "WPS-001.pdf",
  },
  {
    id: 2,
    projectId: 1,
    projectCode: "PA-001",
    projectName: "Project Alpha",
    wpsNumber: "WPS-002",
    weldingProcess: "TIG",
    fileName: "WPS-002.pdf",
  },
  {
    id: 3,
    projectId: 2,
    projectCode: "PB-002",
    projectName: "Project Beta",
    wpsNumber: "WPS-003",
    weldingProcess: "SMAW",
    fileName: "WPS-003.pdf",
  },
];

export default function WPS() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingWPS, setEditingWPS] = useState(null);
  const [selectedWPS, setSelectedWPS] = useState(null);
  const [wpsList, setWpsList] = useState(INITIAL_WPS);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wpsToDelete, setWpsToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // COMMENTED OUT: API Hooks
  // const { data: wpsList = [], isLoading, error } = useGetWPSQuery({});
  // const createWPSMutation = useCreateWPSMutation();
  // const deleteWPSMutation = useDeleteWPSMutation();

  const handleAdd = () => {
    setEditingWPS(null);
    setMode("adding");
  };

  const handleEdit = (wps) => {
    setEditingWPS(wps);
    setMode("editing");
  };

  const handleSave = (formData) => {
    // COMMENTED OUT: API Call
    // createWPSMutation.mutate(formData, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: ["wps"] });
    //     setMode("idle");
    //     setEditingWPS(null);
    //     toast.success("WPS has been saved.");
    //   },
    //   onError: (error) => {
    //     toast.error(error.message || "Failed to save WPS.");
    //   },
    // });

    // LOCAL STATE UPDATE
    if (editingWPS) {
      // Update existing WPS
      setWpsList((prevList) =>
        prevList.map((w) =>
          w.id === editingWPS.id
            ? {
                ...w,
                ...(formData instanceof FormData
                  ? Object.fromEntries(formData)
                  : formData),
              }
            : w
        )
      );
      toast.success("WPS has been updated.");
    } else {
      // Add new WPS
      const newWPS = {
        ...Object.fromEntries(formData instanceof FormData ? formData : []),
        id: Math.max(...wpsList.map((w) => w.id), 0) + 1,
      };
      setWpsList((prevList) => [...prevList, newWPS]);
      toast.success("WPS has been saved.");
    }
    setMode("idle");
    setEditingWPS(null);
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
      // COMMENTED OUT: API Call
      // deleteWPSMutation.mutate(
      //   { wpsId: wpsToDelete.id },
      //   {
      //     onSuccess: () => {
      //       queryClient.invalidateQueries({ queryKey: ["wps"] });
      //       setDeleteDialogOpen(false);
      //       setWpsToDelete(null);
      //       toast.success("WPS has been deleted.");
      //     },
      //     onError: (error) => {
      //       toast.error(error.message || "Failed to delete WPS.");
      //       setDeleteDialogOpen(false);
      //       setWpsToDelete(null);
      //     },
      //   }
      // );

      // LOCAL STATE UPDATE
      setIsDeleting(true);
      setTimeout(() => {
        setWpsList((prevList) =>
          prevList.filter((w) => w.id !== wpsToDelete.id)
        );
        setDeleteDialogOpen(false);
        setWpsToDelete(null);
        setIsDeleting(false);
        toast.success("WPS has been deleted.");
      }, 500);
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
            isSaving={false}
          />
        )}
        <WPSTable
          wpsList={wpsList}
          selectedWPS={selectedWPS}
          onEdit={handleEdit}
          onSelectWPS={handleSelectWPS}
          onDelete={handleDelete}
        />
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
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
