import { useState } from "react";
import TQLogForm from "../../components/tq-logs/TQLogForm";
import TQLogTable from "../../components/tq-logs/TQLogTable";
import {
  useTQLogs,
  useCreateTQLog,
  useUpdateTQLog,
  useDeleteTQLog,
} from "../../hooks/useTQLogs";
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

const TQLogs = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingTQLog, setEditingTQLog] = useState(null);

  const { data: tqLogList = [], isLoading, error } = useTQLogs();

  const createTQLogMutation = useCreateTQLog();
  const updateTQLogMutation = useUpdateTQLog();
  const deleteTQLogMutation = useDeleteTQLog();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tqLogToDelete, setTqLogToDelete] = useState(null);

  const handleAdd = () => {
    setEditingTQLog(null);
    setMode("adding");
  };

  const handleEdit = (tqLog) => {
    setEditingTQLog(tqLog);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingTQLog) {
      updateTQLogMutation.mutate(
        { id: editingTQLog.id, data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
            setMode("idle");
            setEditingTQLog(null);
            toast.success("TQ Log has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update TQ Log.");
          },
        }
      );
    } else {
      createTQLogMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
          setMode("idle");
          setEditingTQLog(null);
          toast.success("TQ Log has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create TQ Log.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingTQLog(null);
    setMode("idle");
  };

  const handleDelete = (tqLog) => {
    setTqLogToDelete(tqLog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (tqLogToDelete) {
      deleteTQLogMutation.mutate(tqLogToDelete.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tqLogs"] });
          setDeleteDialogOpen(false);
          setTqLogToDelete(null);
          toast.success("TQ Log has been deleted.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete TQ Log.");
          setDeleteDialogOpen(false);
          setTqLogToDelete(null);
        },
      });
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">TQ Logs</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add TQ Log
            </Button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <TQLogForm
            tqLog={editingTQLog}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createTQLogMutation.isPending || updateTQLogMutation.isPending
            }
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading TQ logs...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading TQ logs: {error.message}
          </div>
        ) : (
          <TQLogTable
            tqLogList={tqLogList.data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete TQ Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the TQ Log "
              {tqLogToDelete?.queryNo}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteTQLogMutation.isPending}
            >
              {deleteTQLogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TQLogs;
