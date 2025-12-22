import { useState } from "react";
import { RFILogForm } from "@/components/rfi-logs/RFILogForm";
import { RFILogTable } from "@/components/rfi-logs/RFILogTable";
import {
  useGetRFILogsQuery,
  useCreateRFILogMutation,
  useUpdateRFILogMutation,
  useDeleteRFILogMutation,
} from "../../hooks/useRFILogs";
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

export default function RFILogs() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingRFILog, setEditingRFILog] = useState(null);

  const { data: rfiLogList = [], isLoading, error } = useGetRFILogsQuery({});

  const createRFILogMutation = useCreateRFILogMutation();
  const updateRFILogMutation = useUpdateRFILogMutation();
  const deleteRFILogMutation = useDeleteRFILogMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rfiLogToDelete, setRfiLogToDelete] = useState(null);

  const handleAdd = () => {
    setEditingRFILog(null);
    setMode("adding");
  };

  const handleEdit = (rfiLog) => {
    setEditingRFILog(rfiLog);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingRFILog) {
      updateRFILogMutation.mutate(
        { ...formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            setMode("idle");
            setEditingRFILog(null);
            toast.success("RFI Log has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update RFI Log.");
          },
        }
      );
    } else {
      createRFILogMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
          setMode("idle");
          setEditingRFILog(null);
          toast.success("RFI Log has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create RFI Log.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingRFILog(null);
    setMode("idle");
  };

  const handleDelete = (rfiLog) => {
    setRfiLogToDelete(rfiLog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (rfiLogToDelete) {
      deleteRFILogMutation.mutate(
        { cppRFINo: rfiLogToDelete.cppRFINo },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            setDeleteDialogOpen(false);
            setRfiLogToDelete(null);
            toast.success("RFI Log has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete RFI Log.");
            setDeleteDialogOpen(false);
            setRfiLogToDelete(null);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">RFI Logs</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add RFI Log
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <RFILogForm
            rfiLog={editingRFILog}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createRFILogMutation.isPending || updateRFILogMutation.isPending
            }
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading RFI logs...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading RFI logs: {error.message}
          </div>
        ) : (
          <RFILogTable
            rfiLogList={rfiLogList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete RFI Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the RFI Log "
              {rfiLogToDelete?.rfiNo}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteRFILogMutation.isPending}
            >
              {deleteRFILogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
