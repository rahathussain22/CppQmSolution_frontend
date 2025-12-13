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

function PipelineSection({ project, pipelines }) {
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
    // attach projectId and adminId and call create mutation
    const payload = {
      ...pipelineData,
      projectId: project.id,
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

        <Button
          className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer flex items-center gap-1"
          onClick={handleAddPipelineClick}
        >
          <Plus size={16} />
          <span>Add Pipeline</span>
        </Button>
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
                  {pipe.lineNumber} - {pipe.name}
                </div>
                <div className="text-xs text-gray-500">
                  Lot: {pipe.lotCode}, Class: {pipe.lineClass}, Size:{" "}
                  {pipe.lineSize}, Location: {pipe.location}, Start:{" "}
                  {pipe.startDate
                    ? new Date(pipe.startDate).toLocaleDateString()
                    : "-"}
                </div>
                <div className="text-xs text-gray-500">{pipe.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  onClick={() => handleEditPipeline(pipe)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => openDeleteDialog(pipe)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No pipelines found.</p>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!deletePipelineMutation.isLoading)
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
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deletePipelineMutation.isLoading}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deletePipelineMutation.isLoading}
              className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-progress"
              autoFocus
            >
              {deletePipelineMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PipelineSection;
