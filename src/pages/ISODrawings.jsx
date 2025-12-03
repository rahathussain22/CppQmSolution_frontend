import { useState } from "react";
import { ISODrawingForm } from "@/components/iso-drawings/ISODrawingForm";
import { ISODrawingRevisionForm } from "@/components/iso-drawings/ISODrawingRevisionForm";
import { ISODrawingsTable } from "@/components/iso-drawings/ISODrawingsTable";
import {
  createISODrawing,
  getISODrawings,
  rejectISODrawing,
  sendRevision,
  approveISODrawing,
} from "../api/iso-drawings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "../store/authStore";

export default function ISODrawings() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing', 'revision'
  const [mode, setMode] = useState("idle");
  const [editingDrawing, setEditingDrawing] = useState(null);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [revisionDrawing, setRevisionDrawing] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    drawing: null,
  });
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    drawing: null,
  });
  const [rejectReason, setRejectReason] = useState("");

  const {
    data: drawings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["isoDrawings"],
    queryFn: () => getISODrawings({}),
    select: (data) => (data && data.isoDrawings) || [],
  });

  const createDrawingMutation = useMutation({
    mutationFn: (data) => createISODrawing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      setMode("idle");
      setEditingDrawing(null);
      toast.success("ISO Drawing has been saved.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save ISO Drawing.");
    },
  });

  const deleteDrawingMutation = useMutation({
    mutationFn: ({ isoDrawingId, remarks }) =>
      rejectISODrawing({ isoDrawingId, remarks }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      setDeleteDialog({ open: false, drawing: null });
      setSelectedDrawing(null);
      toast.success("ISO Drawing has been deleted/rejected.");
    },
    onError: () => {
      toast.error("Failed to delete/reject ISO Drawing.");
    },
  });

  const approveDrawingMutation = useMutation({
    mutationFn: ({ isoDrawingId }) =>
      approveISODrawing({
        isoDrawingId,
        approvedDate: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      setSelectedDrawing(null);
      toast.success("ISO Drawing has been approved.");
    },
    onError: () => {
      toast.error("Failed to approve ISO Drawing.");
    },
  });

  const revisionMutation = useMutation({
    mutationFn: (formData) => sendRevision(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      setSelectedDrawing(null);
      setRevisionDrawing(null);
      setMode("idle");
      toast.success("Revision sent.");
    },
    onError: () => {
      toast.error("Failed to send revision.");
    },
  });

  const handleAdd = () => {
    setEditingDrawing(null);
    setMode("adding");
  };

  const handleEdit = (drawing) => {
    setEditingDrawing(drawing);
    setMode("editing");
  };

  const handleDelete = (drawing) => {
    setDeleteDialog({ open: true, drawing });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.drawing) {
      deleteDrawingMutation.mutate({
        isoDrawingId: deleteDialog.drawing.id,
        remarks: "Deleted by user",
      });
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, drawing: null });
  };

  const handleApprove = (drawing) => {
    if (drawing) {
      approveDrawingMutation.mutate({ isoDrawingId: drawing.id });
    }
  };

  const handleReject = (drawing) => {
    setRejectReason("");
    setRejectDialog({ open: true, drawing });
  };
  const handleRejectConfirm = () => {
    if (rejectDialog.drawing && rejectReason) {
      deleteDrawingMutation.mutate({
        isoDrawingId: rejectDialog.drawing.id,
        remarks: rejectReason,
      });
      setRejectDialog({ open: false, drawing: null });
      setRejectReason("");
    }
  };
  const handleRejectCancel = () => {
    setRejectDialog({ open: false, drawing: null });
    setRejectReason("");
  };

  const handleSendRevision = (drawing) => {
    setRevisionDrawing(drawing);
    setMode("revision");
  };

  const handleRevisionSave = (revisionFormData) => {
    revisionMutation.mutate(revisionFormData);
  };

  const handleRevisionCancel = () => {
    setRevisionDrawing(null);
    setMode("idle");
  };

  const handleSave = (formData) => {
    createDrawingMutation.mutate(formData);
  };

  const handleCancel = () => {
    setEditingDrawing(null);
    setMode("idle");
  };

  const handleSelectDrawing = (drawing) => {
    setSelectedDrawing(drawing);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">ISO Drawings</h4>
          {user.permissions === "all" && mode === "idle" && (
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold"
            >
              + Add ISO Drawing
            </button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <ISODrawingForm
            drawing={editingDrawing}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createDrawingMutation.isPending}
          />
        )}
        {mode === "revision" && (
          <ISODrawingRevisionForm
            drawing={revisionDrawing}
            onSave={handleRevisionSave}
            onCancel={handleRevisionCancel}
            isSaving={revisionMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading ISO Drawings...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading ISO Drawings: {error.message}
          </div>
        ) : (
          <ISODrawingsTable
            drawings={drawings}
            selectedDrawing={selectedDrawing}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onApprove={handleApprove}
            onReject={handleReject}
            onSendRevision={handleSendRevision}
            onSelectDrawing={handleSelectDrawing}
            isDeleting={deleteDrawingMutation.isPending}
          />
        )}
      </div>
      {/* Delete Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!deleteDrawingMutation.isPending)
            setDeleteDialog((old) => ({ ...old, open }));
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete ISO Drawing?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete ISO drawing
              <span className="font-semibold">
                {" "}
                {deleteDialog.drawing?.drawingNumber}{" "}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deleteDrawingMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deleteDrawingMutation.isPending}
              className="bg-red-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
            >
              {deleteDrawingMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Reject Dialog */}
      <AlertDialog
        open={rejectDialog.open}
        onOpenChange={(open) => {
          if (!deleteDrawingMutation.isPending)
            setRejectDialog((old) => ({ ...old, open }));
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject ISO Drawing</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a reason for rejection for{" "}
              <span className="font-semibold">
                {rejectDialog.drawing?.drawingNumber}
              </span>
              :
            </AlertDialogDescription>
            <input
              type="text"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded mt-3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              disabled={deleteDrawingMutation.isPending}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleRejectCancel}
              disabled={deleteDrawingMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="button"
              onClick={handleRejectConfirm}
              disabled={
                deleteDrawingMutation.isPending || rejectReason.length === 0
              }
              className="bg-red-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
            >
              {deleteDrawingMutation.isPending ? "Rejecting..." : "Reject"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
