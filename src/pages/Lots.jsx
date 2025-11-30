import { useState } from "react";
import { LotForm } from "@/components/lots/LotsForm";
import { LotsTable } from "@/components/lots/LotsTable";
import { createLot, deleteLot, getLots } from "../api/lots";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

export default function Lots() {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("idle");
  const [editingLot, setEditingLot] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, lot: null });
  const user = useAuthStore((state) => state.user);

  const {
    data: lots = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lots"],
    queryFn: getLots,
    select: (data) => (data && data.lots) || [],
  });

  const createLotMutation = useMutation({
    mutationFn: createLot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lots"] });
      setMode("idle");
      setEditingLot(null);
      toast.success("Lot has been created.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create lot.");
    },
  });

  const deleteLotMutation = useMutation({
    mutationFn: deleteLot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lots"] });
      setDeleteDialog({ open: false, lot: null });
      toast.success("Lot has been deleted.");
    },
    onError: () => {
      toast.error("Failed to delete lot.");
    },
  });

  const handleAdd = () => {
    setEditingLot(null);
    setMode("adding");
  };

  const handleEditRow = (lot) => {
    setEditingLot(lot);
    setMode("editing");
  };

  const handleDeleteRow = (lot) => {
    setDeleteDialog({ open: true, lot });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.lot) {
      deleteLotMutation.mutate({
        lotId: deleteDialog.lot.id,
        adminId: user.id,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, lot: null });
  };

  const handleSave = (formData) => {
    const lotData = { ...formData, modifiedBy: user.id };
    createLotMutation.mutate(lotData);
  };

  const handleCancel = () => {
    setMode("idle");
    setEditingLot(null);
  };

  return (
    <>
      <div className="p-4 space-y-4">
        {(mode === "adding" || mode === "editing") && (
          <LotForm
            lot={editingLot}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createLotMutation.isPending}
          />
        )}
        {mode === "idle" && (
          <Button
            onClick={handleAdd}
            className="bg-blue-600 text-white rounded"
          >
            + Add Lot
          </Button>
        )}

        {isLoading ? (
          <div className="p-4 text-gray-600">Loading lots...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading lots: {error.message}
          </div>
        ) : (
          <LotsTable
            lots={lots}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            isDeleting={deleteLotMutation.isPending}
          />
        )}
      </div>
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!deleteLotMutation.isPending)
            setDeleteDialog((old) => ({ ...old, open }));
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lot?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete lot
              <span className="font-semibold"> {deleteDialog.lot?.name} </span>(
              {deleteDialog.lot?.lotCode})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deleteLotMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deleteLotMutation.isPending}
              className="bg-red-500 text-white"
            >
              {deleteLotMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
