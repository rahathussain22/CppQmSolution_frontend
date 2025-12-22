import { useState } from "react";
import NCRLogForm from "../../components/ncr-logs/NCRLogForm";
import NCRLogTable from "../../components/ncr-logs/NCRLogTable";
import {
  useNCRLogs,
  useCreateNCRLog,
  useUpdateNCRLog,
  useDeleteNCRLog,
} from "../../hooks/useNCRLogs";
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
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";

const NCRLogs = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingNCRLog, setEditingNCRLog] = useState(null);

  const { data: ncrLogList = [], isLoading, error } = useNCRLogs();

  const createNCRLogMutation = useCreateNCRLog();
  const updateNCRLogMutation = useUpdateNCRLog();
  const deleteNCRLogMutation = useDeleteNCRLog();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ncrLogToDelete, setNcrLogToDelete] = useState(null);

  const handleAdd = () => {
    setEditingNCRLog(null);
    setMode("adding");
  };

  const handleEdit = (ncrLog) => {
    setEditingNCRLog(ncrLog);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingNCRLog) {
      updateNCRLogMutation.mutate(
        { id: editingNCRLog.id, data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
            setMode("idle");
            setEditingNCRLog(null);
            toast.success("NCR Log has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update NCR Log.");
          },
        }
      );
    } else {
      createNCRLogMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
          setMode("idle");
          setEditingNCRLog(null);
          toast.success("NCR Log has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create NCR Log.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingNCRLog(null);
    setMode("idle");
  };

  const handleDelete = (ncrLog) => {
    setNcrLogToDelete(ncrLog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ncrLogToDelete) {
      deleteNCRLogMutation.mutate(ncrLogToDelete.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ncrLogs"] });
          setDeleteDialogOpen(false);
          setNcrLogToDelete(null);
          toast.success("NCR Log has been deleted.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete NCR Log.");
          setDeleteDialogOpen(false);
          setNcrLogToDelete(null);
        },
      });
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">NCR Logs</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add NCR Log
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <NCRLogForm
            ncrLog={editingNCRLog}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createNCRLogMutation.isPending || updateNCRLogMutation.isPending
            }
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading NCR logs...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading NCR logs: {error.message}
          </div>
        ) : (
          <NCRLogTable
            ncrLogList={ncrLogList.data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete NCR Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the NCR Log "
              {ncrLogToDelete?.ncrNo}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteNCRLogMutation.isPending}
            >
              {deleteNCRLogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NCRLogs;
