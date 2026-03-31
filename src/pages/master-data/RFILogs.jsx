import { useState, useEffect } from "react";
import { Sheet, ChevronLeft, ChevronRight, FileSpreadsheet } from "lucide-react";
import { RFILogForm } from "@/components/rfi-logs/RFILogForm";
import { RFILogTable } from "@/components/rfi-logs/RFILogTable";
import { SubmitFinalInspectionDialog } from "@/components/rfi-logs/SubmitFinalInspectionDialog";
import { BulkUploadRFI } from "@/components/rfi-logs/BulkUploadRFI";
import { LoadingOverlay } from "@/components/master-database/LoadingOverlay";
import {
  useGetRFILogsQuery,
  useCreateRFILogMutation,
  useUpdateRFILogMutation,
  useDeleteRFILogMutation,
  useBulkCreateRFILogMutation,
  useGenerateRFILogFormMutation,
} from "../../hooks/useRFILogs";
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
import { exportRFILogs } from "../../api/rfiLogs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const SEARCH_COLUMNS = [
  { value: "rfiNumber", label: "RFI Number" },
  { value: "discipline", label: "Discipline" },
  { value: "itpNumber", label: "ITP Number" },
  { value: "reportNumber", label: "Report Number" },
  { value: "description", label: "Description" },
  { value: "location", label: "Location" },
  { value: "inspectionLevel", label: "Inspection Level" },
  { value: "companyInspectionLevel", label: "Company Inspection Level" },
  { value: "drawingNumber", label: "Drawing Number" },
  { value: "dateOfInspection", label: "Date of Inspection" },
  { value: "qc", label: "QC" },
  { value: "companyQC", label: "Company QC" },
  { value: "pmt", label: "PMT" },
  { value: "status", label: "Status" },
  { value: "inspectionDocument", label: "Inspection Document" },

];

export default function RFILogs() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  // Form modes: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingRFILog, setEditingRFILog] = useState(null);

  // Bulk upload
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Submit Final Inspection dialog
  const [submitInspectionDialogOpen, setSubmitInspectionDialogOpen] =
    useState(false);
  const [rfiLogForInspection, setRfiLogForInspection] = useState(null);

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rfiLogToDelete, setRfiLogToDelete] = useState(null);

  // Pagination
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState("rfiNumber");
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setCursor(null);
      setPrevCursor(null);
      setPage(1);
    }, 600);
    return () => clearTimeout(handle);
  }, [search]);

  useEffect(() => {
    document.body.style.cursor = isExporting ? "wait" : "default";

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isExporting]);

  // Queries and mutations
  const {
    data: rfiData,
    isLoading,
    error,
    isFetching,
  } = useGetRFILogsQuery({
    cursor, prevCursor, limit, search: debouncedSearch,
    searchBy: debouncedSearch ? searchBy : null,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const rfiLogList = rfiData?.rfis || [];
  const pagination = rfiData?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit,
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage && pagination?.nextCursor) {
      setCursor(pagination.nextCursor);
      setPrevCursor(null);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.prevCursor) {
      setPrevCursor(pagination.prevCursor);
      setCursor(null);
      setPage((prev) => Math.max(1, prev - 1));
    }
  };

  const resetPagination = () => {
    setCursor(null);
    setPrevCursor(null);
    setPage(1);
  };

  const createRFILogMutation = useCreateRFILogMutation();
  const updateRFILogMutation = useUpdateRFILogMutation();
  const deleteRFILogMutation = useDeleteRFILogMutation();
  const bulkCreateRFILogMutation = useBulkCreateRFILogMutation();
  const generateRFILogFormMutation = useGenerateRFILogFormMutation();

  // ========== Table Actions ==========
  const handleGenerateForm = (rfiLog) => {
    if (!rfiLog?.id) {
      toast.error("Unable to generate form: missing RFI ID.");
      return;
    }

    generateRFILogFormMutation.mutate(
      { id: rfiLog.id },
      {
        onSuccess: (data) => {
          const pdfPath = data?.pdfPath || data?.data?.pdfPath;

          if (pdfPath) {
            window.open(pdfPath, "_blank", "noopener,noreferrer");
            toast.success("Form generated successfully.");
          } else {
            toast.error("Form generated but PDF path was not provided.");
          }
        },
        onError: (error) => {
          toast.error(
            error?.message || "Failed to generate form. Please try again."
          );
        },
      }
    );
  };

  const handleSubmitFinalInspection = (rfiLog) => {
    setRfiLogForInspection(rfiLog);
    setSubmitInspectionDialogOpen(true);
  };

  const handleSubmitFinalInspectionConfirm = (formData) => {
    if (rfiLogForInspection) {
      updateRFILogMutation.mutate(
        { formData, id: rfiLogForInspection.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            setSubmitInspectionDialogOpen(false);
            setRfiLogForInspection(null);
            toast.success("Final inspection submitted successfully.");
          },
          onError: (error) => {
            toast.error(
              error.message || "Failed to submit final inspection."
            );
          },
        }
      );
    }
  };

  const handleEdit = (rfiLog) => {
    setEditingRFILog(rfiLog);
    setMode("editing");
  };

  const handleDelete = (rfiLog) => {
    setRfiLogToDelete(rfiLog);
    setDeleteDialogOpen(true);
  };

  // ========== Form Actions ==========
  const handleAdd = () => {
    setEditingRFILog(null);
    setMode("adding");
  };

  const handleSave = (formData) => {
    if (mode === "editing" && editingRFILog) {
      updateRFILogMutation.mutate(
        { formData, id: editingRFILog.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            resetPagination();
            setMode("idle");
            setEditingRFILog(null);
            toast.success("RFI Log has been updated.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update RFI Log.");
          },
        }
      );
    } else {
      createRFILogMutation.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
          resetPagination();
          setMode("idle");
          setEditingRFILog(null);
          toast.success("RFI Log has been created.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create RFI Log.");
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingRFILog(null);
    setMode("idle");
  };

  const confirmDelete = () => {
    if (rfiLogToDelete) {
      deleteRFILogMutation.mutate(
        { id: rfiLogToDelete.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
            setDeleteDialogOpen(false);
            setRfiLogToDelete(null);
            toast.success("RFI Log has been deleted.");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete RFI Log.");
            setDeleteDialogOpen(false);
            setRfiLogToDelete(null);
          },
        }
      );
    }
  };

  // ========== Bulk Upload ==========
  const handleBulkUpload = (file) => {
    bulkCreateRFILogMutation.mutate(file, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rfiLogs"] });
        setShowBulkUpload(false);
        toast.success("RFI logs imported successfully.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to import RFI logs.");
      },
    });
  };

  const handleBulkUploadCancel = () => {
    setShowBulkUpload(false);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const response = await exportRFILogs({ search: search ?? "", searchBy: searchBy ?? "", startDate: startDate || undefined, endDate: endDate || undefined });
      const url = response?.data?.fileUrl || response?.fileUrl;

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        toast.success("RFI logs export started. Check your downloads.");
      } else {
        toast.error("Export initiated but no file URL was returned.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to export RFI logs.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        isVisible={generateRFILogFormMutation.isPending}
        message="Generating RFI Form..."
      />
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">RFI Logs</h4>
          <div className="flex gap-2">
            {canAdd && (
              <>
                <Button
                  onClick={() => handleExport()}
                  className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer"
                >
                  <FileSpreadsheet />
                  Export
                </Button>
                <Button
                  onClick={() => setShowBulkUpload(true)}
                  className="bg-green-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-green-700 cursor-pointer"
                >
                  <Sheet />
                  Bulk Upload
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={mode !== "idle"}
                  className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black disabled:bg-gray-400 cursor-pointer"
                >
                  + Create RFI
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bulk Upload Form */}
        {showBulkUpload && (
          <BulkUploadRFI
            isLoading={bulkCreateRFILogMutation.isPending}
            onUpload={handleBulkUpload}
            onCancel={handleBulkUploadCancel}
          />
        )}

        {/* Add/Edit Form */}
        {(mode === "adding" || mode === "editing") && (
          <RFILogForm
            rfiLog={editingRFILog}
            isEditing={mode === "editing"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={
              createRFILogMutation.isPending || updateRFILogMutation.isPending
            }
          />
        )}

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
                  {SEARCH_COLUMNS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
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

        {/* RFI Logs Table */}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading RFI logs...</div>
        ) : error ? (
          <div className="p-4 text-gray-700">
            Error loading RFI logs: {error.message}
          </div>
        ) : (
          <RFILogTable
            rfiLogList={rfiLogList}
            onGenerateForm={handleGenerateForm}
            onSubmitFinalInspection={handleSubmitFinalInspection}
            onEdit={handleEdit}
            onDelete={handleDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            pagination={pagination}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            page={page}
            isFetching={isFetching}
            search={search}
            searchBy={searchBy}
            onSearchChange={(value) => setSearch(value)}
            onSearchByChange={(value) => setSearchBy(value)}
          />
        )}

      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete RFI Log</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete RFI "
              {rfiLogToDelete?.rfiNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteRFILogMutation.isPending}
            >
              {deleteRFILogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Final Inspection Dialog */}
      <SubmitFinalInspectionDialog
        open={submitInspectionDialogOpen}
        rfiLog={rfiLogForInspection}
        isSaving={updateRFILogMutation.isPending}
        onSubmit={handleSubmitFinalInspectionConfirm}
        onCancel={() => {
          setSubmitInspectionDialogOpen(false);
          setRfiLogForInspection(null);
        }}
      />
    </>
  );
}
