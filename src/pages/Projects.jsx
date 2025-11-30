import { useState } from "react";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, deleteProject } from "../api/project";
import { useAuthStore } from "../store/authStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Projects() {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("idle"); // 'idle' | 'adding' | 'editing'
  const [editingProject, setEditingProject] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    project: null,
  });
  const user = useAuthStore((state) => state.user);

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    select: (data) => (data && data.projects) || [],
  });

  // Mutate (Create) Project
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project has been created.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project.");
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setDeleteDialog({ open: false, project: null });
      toast.success("Project has been deleted.");
    },
    onError: () => {
      toast.error("Failed to delete project.");
    },
  });

  const handleDeleteRow = (project) => {
    setDeleteDialog({ open: true, project });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.project) {
      deleteProjectMutation.mutate({
        projectCode: deleteDialog.project.projectCode,
        adminId: user.id,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, project: null });
  };

  const handleEditRow = (project) => {
    setEditingProject(project);
    setMode("editing");
  };

  const handleAdd = () => {
    setEditingProject(null);
    setMode("adding");
  };

  const handleSave = (projectData) => {
    const data = { ...projectData, adminId: user.id };
    createProjectMutation.mutate(data, {
      onSuccess: () => {
        setMode("idle");
        setEditingProject(null);
      },
    });
  };

  const handleCancel = () => {
    setMode("idle");
    setEditingProject(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="p-4 space-y-4">
          {/* Show form only if adding or editing */}
          {(mode === "adding" || mode === "editing") && (
            <ProjectForm
              project={editingProject}
              isEditing={mode === "editing" || mode === "adding"}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={createProjectMutation.isPending}
            />
          )}

          {/* Always show add button if not in form view */}
          {mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-blue-600 text-white rounded"
            >
              <Plus className="size-4" />
              Add Project
            </Button>
          )}

          {isLoading ? (
            <div className="p-4 text-gray-600">Loading projects...</div>
          ) : error ? (
            <div className="p-4 text-red-700">
              Error loading projects: {error.message}
            </div>
          ) : (
            <ProjectsTable
              projects={projects}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
              isDeleting={deleteProjectMutation.isPending}
            />
          )}
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          // Only allow closing if not deleting
          if (!deleteProjectMutation.isPending) {
            setDeleteDialog((old) => ({ ...old, open }));
          }
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete project
              <span className="font-semibold">
                {" "}
                {deleteDialog.project?.name}{" "}
              </span>
              ({deleteDialog.project?.projectCode})? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={deleteProjectMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={deleteProjectMutation.isPending}
              className="bg-red-500 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-progress"
              autoFocus
            >
              {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
