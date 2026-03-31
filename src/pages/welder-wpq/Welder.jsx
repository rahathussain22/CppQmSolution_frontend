import { useEffect, useState } from "react";
import { WelderForm } from "@/components/welder/WelderForm";
import { WelderTable } from "@/components/welder/WelderTable";
import {
  useGetWelderQuery,
  useCreateWelderMutation,
  useDeleteWelderMutation,
  useCreateBulkWeldersMutation,
  useUpdateWelderMutation
} from "../../hooks/useWelder";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import {
  AlertDialog,
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
import { FileSpreadsheet, Upload } from "lucide-react";
import { exportWelders } from "../../api/welder";

export default function Welder() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

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
  const [isExporting, setIsExporting] = useState(false);

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

  useEffect(() => {
    document.body.style.cursor = isExporting ? "wait" : "default";

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isExporting]);

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
      setPrevCursor(null);
      setCursor(pagination.nextCursor);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage && pagination?.prevCursor) {
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

  const createWelderMutation = useCreateWelderMutation();
  const updateWelderMutation = useUpdateWelderMutation();
  const deleteWelderMutation = useDeleteWelderMutation();
  const createBulkWeldersMutation = useCreateBulkWeldersMutation();

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
    if (mode === "editing" && editingWelder?.id) {
      // ✅ update existing record
      updateWelderMutation.mutate(
        { id: editingWelder.id, formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["welders"] });
            resetPagination();
            setMode("idle");
            setEditingWelder(null);
            toast.success("Welder record has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update welder.");
          },
        }
      );
    } else {
      // ✅ create new record
      createWelderMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["welders"] });
          resetPagination();
          setMode("idle");
          setEditingWelder(null);
          toast.success("Welder record has been saved.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to save welder.");
        },
      });
    }
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

  const handleBulkUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    createBulkWeldersMutation.mutate(formData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["welders"] });
        resetPagination();
        toast.success(data?.message || "Welders imported successfully.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to import welders.");
      },
    });

    // reset input so same file can be re-uploaded if needed
    e.target.value = "";
  };

  const handleSelectWelder = (welder) => {
    setSelectedWelder(welder);
    setMode("idle");
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const response = await exportWelders({ search: search ?? "", searchBy: searchBy ?? "", startDate: startDate || undefined, endDate: endDate || undefined });
      console.log("Export response:", response);
      const url = response?.data?.fileUrl || response?.fileUrl;

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        toast.success("Welder logs export started. Check your downloads.");
      } else {
        toast.error("Export initiated but no file URL was returned.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to export Welder logs.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-3xl font-bold">Welder Details</h4>
            {canAdd && mode === "idle" && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleExport()}
                  className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer"
                >
                  <FileSpreadsheet />
                  Export
                </Button>
                {/* Bulk Upload */}
                <label htmlFor="bulk-upload">
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-800 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    disabled={createBulkWeldersMutation.isPending}
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-1" />
                      {createBulkWeldersMutation.isPending ? "Importing..." : "Import Excel"}
                    </span>
                  </Button>
                  <input
                    id="bulk-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={handleBulkUpload}
                  />
                </label>

                <Button
                  onClick={handleAdd}
                  className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
                >
                  + Add Welder
                </Button>
              </div>
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

              {/* Search By dropdown — matches Welder schema columns */}
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
                    <SelectItem value="jccNumber">JCC No.</SelectItem>
                    <SelectItem value="symbol">Symbol</SelectItem>
                    <SelectItem value="welderId">Welder ID / Passport</SelectItem>
                    <SelectItem value="cpp">CPP</SelectItem>
                    <SelectItem value="ilfOrBoc">ILF / BOC</SelectItem>
                    <SelectItem value="weldingProcess">Welding Process</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
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
            isSaving={createWelderMutation.isPending || updateWelderMutation.isPending}
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
            <AlertDialogTitle>Delete Welder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the record for "
              {welderToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
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