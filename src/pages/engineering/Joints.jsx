import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetWeldJointsQuery,
  useCreateWeldJointMutation,
  useUpdateWeldJointMutation,
  useDeleteWeldJointMutation,
} from "@/hooks/useWeldJoints";
import { WeldJointForm } from "@/components/joints/JointForm";
import { JointTable } from "@/components/joints/JointTable";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Joints() {
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const queryClient = useQueryClient();
  const [mode, setMode] = useState("idle");
  const [editingJoint, setEditingJoint] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jointToDelete, setJointToDelete] = useState(null);

  // Pagination & filters
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handle);
  }, [search]);

  const effectiveSearchBy = debouncedSearch ? searchBy : "";

  const {
    data: weldJointData,
    isLoading,
    error,
    isFetching,
  } = useGetWeldJointsQuery({
    cursor,
    prevCursor,
    limit,
    search: debouncedSearch || undefined,
    searchBy: effectiveSearchBy || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const joints = weldJointData?.weldJoints || [];
  const pagination = weldJointData?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit,
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage && pagination?.nextCursor) {
      setPrevCursor(null);
      setCursor(pagination.nextCursor);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.prevCursor) {
      setCursor(null);
      setPrevCursor(pagination.prevCursor);
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  const resetPagination = () => {
    setCursor(null);
    setPrevCursor(null);
    setPage(1);
  };

  const createMutation = useCreateWeldJointMutation();
  const updateMutation = useUpdateWeldJointMutation();
  const deleteMutation = useDeleteWeldJointMutation();

  const handleAdd = () => {
    resetPagination();
    setEditingJoint(null);
    setMode("adding");
  };

  const handleEdit = (joint) => {
    resetPagination();
    setEditingJoint(joint);
    setMode("editing");
  };

  const handleSave = (formData) => {
    // formData contains: weldNumber, wpsNumber, drawingNumber, jointType, initialProduction, component1Id, component2Id
    const payload = {
      weldNumber: formData.weldNumber,
      wpsNumber: formData.wpsNumber,
      drawingNumber: formData.drawingNumber,
      jointType: formData.jointType,
      initialProduction: formData.initialProduction,
      components: [formData.component1Id, formData.component2Id],
    };

    if (mode === "editing" && editingJoint) {
      updateMutation.mutate(
        { weldJointId: editingJoint.id, formData: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
            resetPagination();
            setMode("idle");
            setEditingJoint(null);
            toast.success("Weld Joint has been updated.");
          },
          onError: (err) => {
            toast.error(err.message || "Failed to update weld joint.");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
          resetPagination();
          setMode("idle");
          setEditingJoint(null);
          toast.success("Weld Joint has been saved.");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to save weld joint.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingJoint(null);
    setMode("idle");
  };

  const handleDelete = (joint) => {
    setJointToDelete(joint);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (jointToDelete) {
      deleteMutation.mutate(
        { weldJointId: jointToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["weldJoints"] });
            resetPagination();
            setDeleteDialogOpen(false);
            setJointToDelete(null);
            toast.success("Weld Joint has been deleted.");
          },
          onError: (err) => {
            toast.error(err.message || "Failed to delete weld joint.");
            setDeleteDialogOpen(false);
            setJointToDelete(null);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-3xl font-bold">Weld Joints</h4>
            {canAdd && mode === "idle" && (
              <Button
                onClick={handleAdd}
                className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
              >
                + Add Weld Joint
              </Button>
            )}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-3 lg:items-end lg:justify-between border border-gray-200 rounded-md bg-white px-3 py-3 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3 md:items-center flex-1">
              {/* Search box */}
              <div className="w-full md:w-64">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Search
                </label>
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    resetPagination();
                  }}
                  placeholder="Search weld joints..."
                  className="h-9"
                />
              </div>

              {/* Search By dropdown */}
              <div className="w-full md:w-52">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Search by
                </label>
                <Select
                  value={searchBy}
                  onValueChange={(value) => {
                    setSearchBy(value);
                    resetPagination();
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="weldNumber">Weld Number</SelectItem>
                    <SelectItem value="jointType">Joint Type</SelectItem>
                    <SelectItem value="initialProduction">
                      Initial Production
                    </SelectItem>
                    <SelectItem value="wpsNumber">WPS Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date range filters */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Start date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    resetPagination();
                  }}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  End date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    resetPagination();
                  }}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        </div>

        {(mode === "adding" || mode === "editing") && (
          <WeldJointForm
            joint={editingJoint}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createMutation.isPending || updateMutation.isPending}
          />
        )}

        {isLoading ? (
          <div className="p-4 text-gray-600">Loading weld joints...</div>
        ) : error ? (
          <div className="p-4 text-red-700">Error loading weld joints.</div>
        ) : joints.length > 0 ? (
          <JointTable
            joints={joints}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            pagination={pagination}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            page={page}
            isFetching={isFetching}
          />
        ) : (
          <div className="p-4 text-gray-600">No weld joints found.</div>
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Weld Joint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the Weld Joint "
              {jointToDelete?.weldNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
