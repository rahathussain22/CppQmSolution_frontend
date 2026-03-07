import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PipelineForm } from "../pipelines/PipelineForm";
import { createPipeline, deletePipeline } from "../../api/pipelines";
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

function PipelineSection({ project, pipelines, canAdd, canEdit, canDelete }) {
  const [showAddPipelineForm, setShowAddPipelineForm] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    pipeline: null,
  });
  const queryClient = useQueryClient();

  const createPipelineMutation = useMutation({
    mutationFn: createPipeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
      toast.success("Pipeline has been created.");
      setShowAddPipelineForm(false);
      setEditingPipeline(null);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create pipeline.");
    },
  });

  const deletePipelineMutation = useMutation({
    mutationFn: deletePipeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pipelines"] });
      toast.success("Pipeline has been deleted.");
      setDeleteDialog({ open: false, pipeline: null });
    },
    onError: () => {
      toast.error("Failed to delete pipeline.");
    },
  });

  const handleEditPipeline = (pipeline) => {
    setEditingPipeline(pipeline);
    setShowAddPipelineForm(true);
  };

  const handlePipelineSave = (pipelineData) => {
    const payload = {
      projectId: project.id,
      lineNumber: pipelineData.lineNumber,
      lineSize: pipelineData.lineSize,
      lineClass: pipelineData.lineClass,
      location: pipelineData.location,
    };
    createPipelineMutation.mutate(payload);
  };

  const handlePipelineCancel = () => {
    setEditingPipeline(null);
    setShowAddPipelineForm(false);
  };

  const handleAddPipelineClick = () => {
    setShowAddPipelineForm(!showAddPipelineForm);
  };

  const projectPipelines =
    pipelines?.filter((p) => p.projectId === project.id) || [];

  const openDeleteDialog = (pipeline) => {
    setDeleteDialog({ open: true, pipeline });
  };

  const handleDeleteConfirm = () => {
    if (!deleteDialog.pipeline) return;
    deletePipelineMutation.mutate({ pipelineId: deleteDialog.pipeline.id });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, pipeline: null });
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-700">Pipelines</p>

        {canAdd && <Button
          className="px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-black cursor-pointer flex items-center gap-1"
          onClick={handleAddPipelineClick}
        >
          <Plus size={16} />
          <span>Add Pipeline</span>
        </Button>}
      </div>

      {showAddPipelineForm && (
        <PipelineForm
          pipeline={editingPipeline}
          isEditing={true}
          onSave={handlePipelineSave}
          onCancel={handlePipelineCancel}
          isSaving={createPipelineMutation.isPending}
        />
      )}

      {projectPipelines?.length > 0 ? (
        <ul className="pl-4 space-y-2 text-sm text-gray-600">
          {projectPipelines.map((pipe) => (
            <li
              key={pipe.id}
              className="flex items-center justify-between p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <div>
                <div className="font-medium">
                  {pipe.lineNumber}
                </div>
                <div className="text-xs text-gray-500">
                  Location: {pipe.location}, Size: {pipe.lineSize}, Class:{" "}
                  {pipe.lineClass}
                </div>
              </div>
              {(canEdit || canDelete) && <div className="flex items-center gap-2">
                {canEdit && <Button
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  onClick={() => handleEditPipeline(pipe)}
                >
                  <Pencil size={16} />
                </Button>}
                {canDelete && <Button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => openDeleteDialog(pipe)}
                  disabled={deletePipelineMutation.isPending}
                >
                  <Trash2 size={16} />
                </Button>}
              </div>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No pipelines found.</p>
      )}

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!deletePipelineMutation.isPending) {
            setDeleteDialog((old) => ({ ...old, open }));
          }
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
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deletePipelineMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deletePipelineMutation.isPending}
              className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-progress"
              autoFocus
            >
              {deletePipelineMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PipelineSection;
