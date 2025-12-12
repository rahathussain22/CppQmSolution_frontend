import { useState } from "react";
import { PipelineForm } from "@/components/pipelines/PipelineForm";
import { PipelinesTable } from "@/components/pipelines/PipelinesTable";
import { createPipeline, deletePipeline, getPipelines } from "../api/pipelines";
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

export default function Pipelines() {
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    pipeline: null,
  });

  const {
    data: pipelines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pipelines"],
    queryFn: getPipelines,
    select: (data) => (data && data.pipelines) || [],
    refetchOnWindowFocus: false,
  });

  const createPipelineMutation = useMutation({
    mutationFn: createPipeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
      setMode("idle");
      setEditingPipeline(null);
      toast.success("Pipeline has been created.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create pipeline.");
    },
  });

  const deletePipelineMutation = useMutation({
    mutationFn: deletePipeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
      setDeleteDialog({ open: false, pipeline: null });
      toast.success("Pipeline has been deleted.");
    },
    onError: () => {
      toast.error("Failed to delete pipeline.");
    },
  });

  const handleAdd = () => {
    setEditingPipeline(null);
    setMode("adding");
  };

  const handleEdit = (pipeline) => {
    setEditingPipeline(pipeline);
    setMode("editing");
  };

  // This sets up the delete confirmation dialog
  const handleDelete = (pipeline) => {
    setDeleteDialog({ open: true, pipeline });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.pipeline) {
      deletePipelineMutation.mutate({ pipelineId: deleteDialog.pipeline.id });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, pipeline: null });
  };

  const handleSave = (formData) => {
    createPipelineMutation.mutate(formData);
  };

  const handleCancel = () => {
    setEditingPipeline(null);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">Pipelines</h4>
          {user.permissions === "all" && mode === "idle" && (
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold"
            >
              + Add Pipeline
            </button>
          )}
        </div>
        {(mode === "adding" || mode === "editing") && (
          <PipelineForm
            pipeline={editingPipeline}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createPipelineMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading pipelines...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading pipelines: {error.message}
          </div>
        ) : (
          <PipelinesTable
            pipelines={pipelines}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deletePipelineMutation.isPending}
          />
        )}
      </div>
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!deletePipelineMutation.isPending)
            setDeleteDialog((old) => ({ ...old, open }));
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Pipeline?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete pipeline
              <span className="font-semibold">
                {" "}
                {deleteDialog.pipeline?.lineNumber}{" "}
              </span>{" "}
              ({deleteDialog.pipeline?.projectCode} /{" "}
              {deleteDialog.pipeline?.lotCode})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deletePipelineMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deletePipelineMutation.isPending}
              className="bg-red-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
            >
              {deletePipelineMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
