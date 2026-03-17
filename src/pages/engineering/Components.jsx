import { useEffect, useState } from "react";
import { ComponentForm } from "@/components/components/ComponentForm";
import { ComponentTable } from "@/components/components/ComponentTable";
import {
  useGetComponentsQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
} from "../../hooks/useComponents";
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

export default function Components() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingComponent, setEditingComponent] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Debounce search input
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handle);
  }, [search]);

  const effectiveSearchBy = debouncedSearch ? searchBy : "";

  const {
    data: componentData,
    isLoading,
    error,
    isFetching,
  } = useGetComponentsQuery({
    cursor,
    prevCursor,
    limit,
    search: debouncedSearch || undefined,
    searchBy: effectiveSearchBy || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const componentList = componentData?.data || [];
  const pagination = componentData?.pagination || {
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

  const createComponentMutation = useCreateComponentMutation();
  const updateComponentMutation = useUpdateComponentMutation();
  const deleteComponentMutation = useDeleteComponentMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState(null);

  const handleAdd = () => {
    resetPagination();
    setEditingComponent(null);
    setMode("adding");
  };

  const handleEdit = (component) => {
    resetPagination();
    setEditingComponent(component);
    setMode("editing");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingComponent) {
      updateComponentMutation.mutate(
        { ...formData, componentId: editingComponent.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["components"] });
            resetPagination();
            setMode("idle");
            setEditingComponent(null);
            toast.success("Component has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update component.");
          },
        }
      );
    } else {
      createComponentMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["components"] });
          resetPagination();
          setMode("idle");
          setEditingComponent(null);
          toast.success("Component has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create component.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingComponent(null);
    setMode("idle");
  };

  const handleDelete = (component) => {
    setComponentToDelete(component);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      deleteComponentMutation.mutate(
        { componentId: componentToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["components"] });
            resetPagination();
            setDeleteDialogOpen(false);
            setComponentToDelete(null);
            toast.success("Component has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete component.");
            setDeleteDialogOpen(false);
            setComponentToDelete(null);
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
            <h4 className="text-3xl font-bold">Components</h4>
            {canAdd && mode === "idle" && (
              <Button
                onClick={handleAdd}
                className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
              >
                + Add Component
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
                  placeholder="Search components..."
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
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="diameter">Diameter</SelectItem>
                    <SelectItem value="pipeNumber">Pipe Number</SelectItem>
                    <SelectItem value="heatNumber">Heat Number</SelectItem>
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
          <ComponentForm
            component={editingComponent}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createComponentMutation.isPending ||
              updateComponentMutation.isPending
            }
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading components...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading components: {error.message}
          </div>
        ) : (
          <ComponentTable
            componentList={componentList}
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
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Component</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the component "
              {componentToDelete?.name || componentToDelete?.pipeNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteComponentMutation.isPending}
            >
              {deleteComponentMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
