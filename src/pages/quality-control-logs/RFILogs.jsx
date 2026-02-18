import { useState } from "react";
import {Sheet} from "lucide-react";
import { RFILogForm } from "@/components/rfi-logs/RFILogForm";
import { RFILogTable } from "@/components/rfi-logs/RFILogTable";
import { SubmitFinalInspectionDialog } from "@/components/rfi-logs/SubmitFinalInspectionDialog";
import { BulkUploadRFI } from "@/components/rfi-logs/BulkUploadRFI";
import {
  useGetRFILogsQuery,
  useCreateRFILogMutation,
  useUpdateRFILogMutation,
  useDeleteRFILogMutation,
  useBulkCreateRFILogMutation,
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

  // Form modes: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingRFILog, setEditingRFILog] = useState(null);

  // Bulk upload
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Submit Final Inspection dialog
  const [submitInspectionDialogOpen, setSubmitInspectionDialogOpen] =
    useState(false);
  const [rfiLogForInspection, setRfiLogForInspection] = useState(null);

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rfiLogToDelete, setRfiLogToDelete] = useState(null);

  // Queries and mutations
  const { data: rfiLogList = [], isLoading, error } = useGetRFILogsQuery({});

  const createRFILogMutation = useCreateRFILogMutation();
  const updateRFILogMutation = useUpdateRFILogMutation();
  const deleteRFILogMutation = useDeleteRFILogMutation();
  const bulkCreateRFILogMutation = useBulkCreateRFILogMutation();

  // ========== Table Actions ==========
  const handleGenerateForm = (rfiLog) => {
    // Stub: Log to console
    console.log("Generate Form for RFI:", rfiLog.rfiNumber);
    toast.info("Generate Form feature coming soon.");
  };

  const handleSubmitFinalInspection = (rfiLog) => {
    setRfiLogForInspection(rfiLog);
    setSubmitInspectionDialogOpen(true);
  };

  const handleSubmitFinalInspectionConfirm = (formData) => {
    if (rfiLogForInspection) {
      updateRFILogMutation.mutate(
        { formData, id: rfiLogForInspection.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            setSubmitInspectionDialogOpen(false);
            setRfiLogForInspection(null);
            toast.success("Final inspection submitted successfully.");
          },
          onError: (error) => {
            toast.error(
              error.message || "Failed to submit final inspection."
            );
          },
        }
      );
    }
  };

  const handleEdit = (rfiLog) => {
    setEditingRFILog(rfiLog);
    setMode("editing");
  };

  const handleDelete = (rfiLog) => {
    setRfiLogToDelete(rfiLog);
    setDeleteDialogOpen(true);
  };

  // ========== Form Actions ==========
  const handleAdd = () => {
    setEditingRFILog(null);
    setMode("adding");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingRFILog) {
      updateRFILogMutation.mutate(
        { formData, id: editingRFILog.id },
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

  const confirmDelete = () => {
    if (rfiLogToDelete) {
      deleteRFILogMutation.mutate(
        { id: rfiLogToDelete.id },
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

  // ========== Bulk Upload ==========
  const handleBulkUpload = (file) => {
    bulkCreateRFILogMutation.mutate(file, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
        setShowBulkUpload(false);
        toast.success("RFI logs imported successfully.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to import RFI logs.");
      },
    });
  };

  const handleBulkUploadCancel = () => {
    setShowBulkUpload(false);
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">RFI Logs</h4>
          <div className="flex gap-2">
            {user.permissions === "all" && (
              <>
                <Button
                  onClick={() => setShowBulkUpload(true)}
                  className="bg-green-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-green-700"
                >
                  <Sheet />
                  Bulk Upload
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={mode !== "idle"}
                  className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700 disabled:bg-gray-400"
                >
                  + Create RFI
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bulk Upload Form */}
        {showBulkUpload && (
          <BulkUploadRFI
            isLoading={bulkCreateRFILogMutation.isPending}
            onUpload={handleBulkUpload}
            onCancel={handleBulkUploadCancel}
          />
        )}

        {/* Add/Edit Form */}
        {(mode === "adding" || mode === "editing") && (
          <RFILogForm
            rfiLog={editingRFILog}
            isEditing={true}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createRFILogMutation.isPending || updateRFILogMutation.isPending
            }
          />
        )}

        {/* RFI Logs Table */}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading RFI logs...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading RFI logs: {error.message}
          </div>
        ) : (
          <RFILogTable
            rfiLogList={rfiLogList}
            onGenerateForm={handleGenerateForm}
            onSubmitFinalInspection={handleSubmitFinalInspection}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete RFI Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete RFI "
              {rfiLogToDelete?.rfiNumber}"? This action cannot be undone.
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

      {/* Submit Final Inspection Dialog */}
      <SubmitFinalInspectionDialog
        open={submitInspectionDialogOpen}
        rfiLog={rfiLogForInspection}
        isSaving={updateRFILogMutation.isPending}
        onSubmit={handleSubmitFinalInspectionConfirm}
        onCancel={() => {
          setSubmitInspectionDialogOpen(false);
          setRfiLogForInspection(null);
        }}
      />
    </>
  );
}
