import { useEffect, useState } from "react";
import { WelderForm } from "@/components/welder/WelderForm";
import { WelderTable } from "@/components/welder/WelderTable";
import {
  useGetWelderQuery,
  useCreateWelderMutation,
  useDeleteWelderMutation,
} from "../../hooks/useWelder";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Welder() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingWelder, setEditingWelder] = useState(null);
  const [selectedWelder, setSelectedWelder] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handle);
  }, [search]);

  const effectiveSearchBy = debouncedSearch ? searchBy : "";

  const {
    data: welderData,
    isLoading,
    error,
    isFetching,
  } = useGetWelderQuery({
    cursor,
    prevCursor,
    limit,
    search: debouncedSearch || undefined,
    searchBy: effectiveSearchBy || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const welderList = welderData?.welders || [];
  const pagination = welderData?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit,
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage && pagination?.nextCursor) {
      setPrevCursor(cursor);
      setCursor(pagination.nextCursor);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.prevCursor) {
      setCursor(pagination.prevCursor);
      setPrevCursor(pagination.prevCursor);
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  const resetPagination = () => {
    setCursor(null);
    setPrevCursor(null);
    setPage(1);
  };

  const createWelderMutation = useCreateWelderMutation();
  const deleteWelderMutation = useDeleteWelderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [welderToDelete, setWelderToDelete] = useState(null);

  const handleAdd = () => {
    resetPagination();
    setEditingWelder(null);
    setMode("adding");
  };

  const handleEdit = (welder) => {
    resetPagination();
    setEditingWelder(welder);
    setMode("editing");
  };

  const handleSave = (formData) => {
    createWelderMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["welders"] });
        resetPagination();
        setMode("idle");
        setEditingWelder(null);
        toast.success("Welder WPQ has been saved.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save welder.");
      },
    });
  };

  const handleCancel = () => {
    setEditingWelder(null);
    setMode("idle");
  };

  const handleDelete = (welder) => {
    setWelderToDelete(welder);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (welderToDelete) {
      deleteWelderMutation.mutate(
        { welderId: welderToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["welders"] });
            resetPagination();
            setDeleteDialogOpen(false);
            setWelderToDelete(null);
            toast.success("Welder has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete welder.");
            setDeleteDialogOpen(false);
            setWelderToDelete(null);
          },
        }
      );
    }
  };

  const handleSelectWelder = (welder) => {
    setSelectedWelder(welder);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-3xl font-bold">Welder Details</h4>
            {canAdd && mode === "idle" && (
              <Button
                onClick={handleAdd}
                className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
              >
                + Add Welder
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
                  placeholder="Search welders..."
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
                    <SelectItem value="rootA">Root A</SelectItem>
                    <SelectItem value="rootB">Root B</SelectItem>
                    <SelectItem value="fillA">Fill A</SelectItem>
                    <SelectItem value="fillB">Fill B</SelectItem>
                    <SelectItem value="capA">Cap A</SelectItem>
                    <SelectItem value="capB">Cap B</SelectItem>
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
          <WelderForm
            welder={editingWelder}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createWelderMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading welder records...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading welder records: {error.message}
          </div>
        ) : (
          <WelderTable
            welderList={welderList}
            selectedWelder={selectedWelder}
            onEdit={handleEdit}
            onSelectWelder={handleSelectWelder}
            onDelete={handleDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            pagination={pagination}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            page={page}
            isFetching={isFetching}
          />
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Welder WPQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the record for weld "
              {welderToDelete?.weldNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteWelderMutation.isPending}
            >
              {deleteWelderMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
