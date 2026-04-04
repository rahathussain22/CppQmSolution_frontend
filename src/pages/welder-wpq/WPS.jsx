import { useEffect, useState } from "react";
import { WPSForm } from "@/components/wps/WPSForm";
import { WPSTable } from "@/components/wps/WPSTable";
import {
  useGetWPSQuery,
  useCreateWPSMutation,
  useDeleteWPSMutation,
} from "../../hooks/useWPS";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import {
  AlertDialog,
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
import { exportWPS } from "../../api/wps";
import { FileSpreadsheet } from "lucide-react";

export default function WPS() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingWPS, setEditingWPS] = useState(null);
  const [selectedWPS, setSelectedWPS] = useState(null);
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
  const [structuralWPS, setStructuralWPS] = useState([]);
  const [apiWPS, setApiWPS] = useState([]);
  const [asmeWPS, setAsmeWPS] = useState([]);

  useEffect(() => {
    document.body.style.cursor = isExporting ? "wait" : "default";

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isExporting]);

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handle);
  }, [search]);

  const effectiveSearchBy = debouncedSearch ? searchBy : "";

  const {
    data: wpsData,
    isLoading,
    error,
    isFetching,
  } = useGetWPSQuery({
    cursor,
    prevCursor,
    limit,
    search: debouncedSearch || undefined,
    searchBy: effectiveSearchBy || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const wpsList = wpsData?.wps || [];
  const pagination = wpsData?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit,
  };

  useEffect(() => {
    if (wpsList.length > 0) {
      setStructuralWPS(wpsList.filter(wps => wps.wpsType?.toLowerCase() === "structural"));
      setApiWPS(wpsList.filter(wps => wps.wpsType?.toLowerCase() === "api"));
      setAsmeWPS(wpsList.filter(wps => wps.wpsType?.toLowerCase() === "asme"));
    }
  }, [wpsList])

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

  const createWPSMutation = useCreateWPSMutation();
  const deleteWPSMutation = useDeleteWPSMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wpsToDelete, setWpsToDelete] = useState(null);

  const handleAdd = () => {
    resetPagination();
    setEditingWPS(null);
    setMode("adding");
  };

  const handleEdit = (wps) => {
    resetPagination();
    setEditingWPS(wps);
    setMode("editing");
  };

  // ✅ Fix - invalidate query on success, and wait for mutation to complete
  const handleSave = (formData) => {
    const formDataToSend = new FormData();
    const { file, ...fields } = formData;
    Object.entries(fields).forEach(([key, value]) => {
      formDataToSend.append(key, value ?? "");
    });
    if (file) formDataToSend.append("file", file);

    createWPSMutation.mutate(formDataToSend, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wps"] }); // ✅ refetches the list
        resetPagination();
        setMode("idle");       // ✅ close form only after success
        setEditingWPS(null);
        toast.success("WPS has been saved.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save WPS.");
      },
    });
  };

  const handleCancel = () => {
    setEditingWPS(null);
    setMode("idle");
  };

  const handleDelete = (wps) => {
    setWpsToDelete(wps);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (wpsToDelete) {
      deleteWPSMutation.mutate(
        { wpsId: wpsToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wps"] });
            resetPagination();
            setDeleteDialogOpen(false);
            setWpsToDelete(null);
            toast.success("WPS has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete WPS.");
            setDeleteDialogOpen(false);
            setWpsToDelete(null);
          },
        }
      );
    }
  };

  const handleSelectWPS = (wps) => {
    setSelectedWPS(wps);
    setMode("idle");
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const response = await exportWPS({ search: search ?? "", searchBy: searchBy ?? "", startDate: startDate || undefined, endDate: endDate || undefined });
      console.log("Export response:", response);
      const url = response?.data?.fileUrl || response?.fileUrl;

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        toast.success("WPS export started. Check your downloads.");
      } else {
        toast.error("Export initiated but no file URL was returned.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to export WPS.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-3xl font-bold">WPS Management</h4>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleExport()}
                className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer"
              >
                <FileSpreadsheet />
                Export
              </Button>
              {canAdd && mode === "idle" && (
                <Button
                  onClick={handleAdd}
                  className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
                >
                  + Add WPS
                </Button>
              )}
            </div>
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
                  placeholder="Search WPS..."
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
                    <SelectItem value="wpsNumber">WPS Number</SelectItem>
                    <SelectItem value="weldProcess">Weld Process</SelectItem>
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
          <WPSForm
            wps={editingWPS}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createWPSMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading WPS...</div>
        ) : error ? (
          <div className="p-4 text-red-700">Error loading WPS: {error.message}</div>
        ) : (
          <div>
            <h4 className="text-1xl font-bold my-2" >STRUCTURAL WPS (AWS D1.1)</h4>
            <WPSTable
              wpsList={structuralWPS}
              selectedWPS={selectedWPS}
              onEdit={handleEdit}
              onSelectWPS={handleSelectWPS}
              onDelete={handleDelete}
              canEdit={canEdit}
              canDelete={canDelete}
              pagination={pagination}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              page={page}
              isFetching={isFetching}
              wpsType="STRUCTURAL"
            />

            <h4 className="text-1xl font-bold my-2 mt-5" >PIPING/ PIPELINE  WPS (API 1104)</h4>

            <WPSTable
              wpsList={apiWPS}
              selectedWPS={selectedWPS}
              onEdit={handleEdit}
              onSelectWPS={handleSelectWPS}
              onDelete={handleDelete}
              canEdit={canEdit}
              canDelete={canDelete}
              pagination={pagination}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              page={page}
              isFetching={isFetching}
              wpsType="API"
            />

            <h4 className="text-1xl font-bold my-2 mt-5" >PIPING WPS (ASME IX)</h4>

            <WPSTable
              wpsList={asmeWPS}
              selectedWPS={selectedWPS}
              onEdit={handleEdit}
              onSelectWPS={handleSelectWPS}
              onDelete={handleDelete}
              canEdit={canEdit}
              canDelete={canDelete}
              pagination={pagination}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              page={page}
              isFetching={isFetching}
              wpsType="ASME"
            />
          </div>

        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete WPS</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the WPS "{wpsToDelete?.wpsNumber}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteWPSMutation.isPending}>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteWPSMutation.isPending}
            >
              {deleteWPSMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
