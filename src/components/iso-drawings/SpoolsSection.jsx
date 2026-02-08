import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import SpoolForm from "./SpoolForm";
import { getSpools, createSpool, deleteSpool } from "../../api/spools";
import { usePipelines } from "../../hooks/usePipelines";
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

// Static initial spools data
const INITIAL_SPOOLS = [
  {
    id: 1,
    isoDrawingId: 1,
    pipelineId: 1,
    spoolNumber: "SP-001",
    description: "Main spool section A",
  },
  {
    id: 2,
    isoDrawingId: 1,
    pipelineId: 1,
    spoolNumber: "SP-002",
    description: "Secondary spool section A",
  },
  {
    id: 3,
    isoDrawingId: 2,
    pipelineId: 1,
    spoolNumber: "SP-003",
    description: "Support spool section B",
  },
  {
    id: 4,
    isoDrawingId: 3,
    pipelineId: 2,
    spoolNumber: "SP-004",
    description: "Distribution spool section C",
  },
];

function SpoolsSection({ drawing }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSpool, setEditingSpool] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    spool: null,
  });
  const [spools, setSpools] = useState(INITIAL_SPOOLS);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const { data: pipelines = [] } = usePipelines();

  // COMMENTED OUT: API Query
  // const { data: spools = [], isLoading } = useQuery({
  //   queryKey: ["spools", drawing?.id],
  //   queryFn: () => getSpools({ isoDrawingId: drawing?.id }),
  //   enabled: !!drawing?.id,
  //   select: (res) => res.spools || [],
  //   refetchOnWindowFocus: false,
  // });

  // COMMENTED OUT: API Mutations
  // const createMutation = useMutation({
  //   mutationFn: createSpool,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["spools"] });
  //     toast.success("Spool created.");
  //     setShowAddForm(false);
  //     setEditingSpool(null);
  //   },
  //   onError: (err) => toast.error(err?.message || "Failed to create spool."),
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteSpool,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["spools"] });
  //     toast.success("Spool deleted.");
  //     setDeleteDialog({ open: false, spool: null });
  //   },
  //   onError: () => toast.error("Failed to delete spool."),
  // });

  const handleAddClick = () => {
    setEditingSpool(null);
    setShowAddForm((s) => !s);
  };

  const handleEdit = (spool) => {
    setEditingSpool(spool);
    setShowAddForm(true);
  };

  const handleSave = (payload) => {
    // COMMENTED OUT: API Call
    // const data = {
    //   ...payload,
    //   isoDrawingId: drawing.id,
    //   pipelineId: drawing.pipelineId,
    // };
    // createMutation.mutate(data);

    // LOCAL STATE UPDATE
    const data = {
      ...payload,
      isoDrawingId: drawing.id,
      pipelineId: drawing.pipelineId,
    };
    
    if (editingSpool) {
      // Update existing spool
      setSpools((prevSpools) =>
        prevSpools.map((s) =>
          s.id === editingSpool.id ? { ...s, ...data } : s
        )
      );
      toast.success("Spool updated.");
    } else {
      // Add new spool
      const newSpool = {
        ...data,
        id: Math.max(...spools.map((s) => s.id), 0) + 1,
      };
      setSpools((prevSpools) => [...prevSpools, newSpool]);
      toast.success("Spool created.");
    }
    setShowAddForm(false);
    setEditingSpool(null);
  };

  const openDeleteDialog = (spool) => setDeleteDialog({ open: true, spool });

  const handleDeleteConfirm = () => {
    if (!deleteDialog.spool) return;
    
    // COMMENTED OUT: API Call
    // deleteMutation.mutate({ spoolId: deleteDialog.spool.id });

    // LOCAL STATE UPDATE
    setIsDeleting(true);
    setTimeout(() => {
      setSpools((prevSpools) =>
        prevSpools.filter((s) => s.id !== deleteDialog.spool.id)
      );
      setDeleteDialog({ open: false, spool: null });
      setIsDeleting(false);
      toast.success("Spool deleted.");
    }, 500);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingSpool(null);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-700">Spools</p>
        <Button
          className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
          onClick={handleAddClick}
        >
          <Plus size={16} /> <span>Add Spool</span>
        </Button>
      </div>

      {showAddForm && (
        <SpoolForm
          spool={editingSpool}
          isEditing={true}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={false}
          pipelines={pipelines || []}
          isoDrawingId={drawing?.id}
        />
      )}

      {spools?.length > 0 ? (
        <ul className="pl-4 space-y-2 text-sm text-gray-600">
          {spools.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between p-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              <div>
                <div className="font-medium">{s.spoolNumber}</div>
                <div className="text-xs text-gray-500">{s.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => handleEdit(s)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => openDeleteDialog(s)}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No spools found.</p>
      )}

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!isDeleting)
            setDeleteDialog((old) => ({ ...old, open }));
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Spool?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete spool
              <span className="font-semibold">
                {" "}
                {deleteDialog.spool?.spoolNumber}{" "}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteDialog({ open: false, spool: null })}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-progress"
              autoFocus
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SpoolsSection;
