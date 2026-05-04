import { useState, useEffect } from "react";
import { Sheet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDatabaseTable } from "@/components/master-database/MasterDatabaseTable";
import { MasterDatabaseForm } from "@/components/master-database/MasterDatabaseForm";
import { BulkEditDatabase } from "@/components/master-database/BulkEditDatabase";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetMasterDatabaseQuery,
  useCreateMasterDatabaseMutation,
  useUpdateMasterDatabaseMutation,
  useDeleteMasterDatabaseMutation,
  useBulkEditMasterDatabaseMutation
} from "../../hooks/useMasterDatabase";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "../../store/authStore";

const MasterDatabase = () => {
  const user = useAuthStore((state) => state.user);

  const canAdd = user?.permissions === "view+add" || user?.permissions === "view+add+update" || user?.permissions === "all";
  const canEdit = user?.permissions === "view+add+update" || user?.permissions === "all";
  const canDelete = user?.permissions === "all";

  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  // Pagination
  const [cursor, setCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState("weldNumber");

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
      // reset pagination when search changes
      setCursor(null);
      setPrevCursor(null);
      setPage(1);
    }, 1000);
    return () => clearTimeout(handle);
  }, [search]);


  // React Query Fetch
  const {
    data: queryData,
    isLoading,
    isFetching,
    error,
  } = useGetMasterDatabaseQuery({
    cursor,
    prevCursor,
    limit,
    search: debouncedSearch || undefined,
    column: debouncedSearch ? searchBy : undefined,
  });

  const masterData = queryData?.data || [];
  const pagination = queryData?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
  };

  const createMutation = useCreateMasterDatabaseMutation();
  const updateMutation = useUpdateMasterDatabaseMutation();
  const deleteMutation = useDeleteMasterDatabaseMutation();
  const bulkEditMutation = useBulkEditMasterDatabaseMutation();

  const handleBulkEdit = (file) => {
    bulkEditMutation.mutate(file, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["masterDatabase"] });
        setShowBulkEdit(false);
        toast.success("Master database updated successfully.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update master database.");
      },
    });
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

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!recordToDelete) return;
    deleteMutation.mutate(
      { id: recordToDelete.id || recordToDelete._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["masterDatabase"] });
          toast.success("Record deleted successfully.");
          setDeleteDialogOpen(false);
          setRecordToDelete(null);
        },
        onError: (err) => {
          console.error(err);
          const errorMsg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            (err.response?.data?.errors && Array.isArray(err.response.data.errors) ? err.response.data.errors.map(e => e.msg || e.message).join(", ") : null) ||
            "Failed to delete record.";
          toast.error(typeof errorMsg === 'string' ? errorMsg : "Failed to delete record.");
          setDeleteDialogOpen(false);
          setRecordToDelete(null);
        }
      }
    );
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsAdding(false);
  };

  const handleDownload = async () => {
    try {
      const { exportToXlsx } = await import("@/components/master-database/exportToXlsx");
      exportToXlsx(masterData, "master-database.xlsx");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to generate Excel file.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Master Database</h1>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="cursor-pointer px-4 py-2 text-sm rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Sheet size={18} />
            Download
          </Button>
          {canAdd && (
            <>
              <Button
                onClick={() => setShowBulkEdit(true)}
                className="cursor-pointer px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Sheet size={18} />
                Bulk Edit
              </Button>
              <Button
                onClick={() => setIsAdding(true)}
                disabled={isAdding}
                className="cursor-pointer px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-black flex items-center gap-2 disabled:bg-gray-400"
              >
                <Plus size={18} />
                Create Record
              </Button>
            </>
          )}
        </div>
      </div>

      {showBulkEdit && (
        <BulkEditDatabase
          isLoading={bulkEditMutation.isPending}
          onUpload={handleBulkEdit}
          onCancel={() => setShowBulkEdit(false)}
        />
      )}

      <Dialog
        open={isAdding || !!editingRecord}
        onOpenChange={(open) => {
          if (!open) {
            setIsAdding(false);
            setEditingRecord(null);
          }
        }}
      >
        <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto bg-gray-50 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {editingRecord ? "Edit Master Database Record" : "Create Master Database Record"}
            </DialogTitle>
          </DialogHeader>
          <MasterDatabaseForm
            isEditing={!!editingRecord}
            masterData={editingRecord || {}}
            isSaving={createMutation.isPending || updateMutation.isPending}
            onSave={(data) => {
              const parseToNum = (val) => {
                if (val === "" || val === null || val === undefined) return null;
                const num = parseFloat(val);
                return isNaN(num) ? null : num;
              };

              const mappedPayload = {
                lineNumber: data.lineNumber, location: data.location, lineSize: data.lineSize, lineClass: data.lineClass,
                drawingNumber: data.drawingNumber, spoolNumber: data.spoolNumber,
                weldNumber: data.weldNumber, jointType: data.jointType, initialProduction: data.initialProduction,
                fitupDate: data.fitupDate || null, fitupRFI: data.fitupRFI,
                weldingDate: data.weldingDate || null, weldingRFI: data.weldingRFI,
                component1Name: data.comp1Type, component1Material: data.comp1Material, component1Diameter: data.comp1Diameter, component1Thickness: parseToNum(data.comp1Thickness), component1Length: parseToNum(data.comp1Length), component1PipeNumber: data.comp1PipeNo, component1HeatNumber: data.comp1HeatNo,
                component2Name: data.comp2Type, component2Material: data.comp2Material, component2Diameter: data.comp2Diameter, component2Thickness: parseToNum(data.comp2Thickness), component2Length: parseToNum(data.comp2Length), component2PipeNumber: data.comp2PipeNo, component2HeatNumber: data.comp2HeatNo,
                wpsNumber: data.wpsNumber, weldProcess: data.weldProcess,
                rootA: data.rootA, rootB: data.rootB, fillA: data.fillA, fillB: data.fillB, capA: data.capA, capB: data.capB,
                preheatTemp: parseToNum(data.preHeatTemp), weldVisual: data.weldVisual, ndtPercent: parseToNum(data.ndtPercent),
                rtRequestDate: data.rtRequestDate || null, rtRFINumber: data.rtRfiNo, rtFirstReportNumber: data.rtReport1, rtFirstResult: data.rtResult1, rtTracter1: data.rtTracer1, rtTracter2: data.rtTracer2, rtSecondReportNumber: data.rtReport2, rtSecondResult: data.rtResult2, rtThirdReportNumber: data.rtReport3, rtThirdResult: data.rtResult3,
                rtFilmQuality: data.ilfRtFilmQuality, rtWeldQuality: data.ilfRtWeldQuality, rtPercentReviewed: parseToNum(data.ilfRtPercentage),
                utType: data.utType, utRequestDate: data.utRequestDate || null, utRFINumber: data.utRfiNo, utFirstReportNumber: data.utReport1, utFirstResult: data.utResult1, utTracter1: data.utTracer1, utTracter2: data.utTracer2, utSecondReportNumber: data.utReport2, utSecondResult: data.utResult2, utThirdReportNumber: data.utReport3, utThirdResult: data.utResult3,
                utIlfAgreement: data.ilfUtAgreement, utPercentReviewed: parseToNum(data.ilfUtPercentage),
                ndeType: data.otherNdeType, ndeRequestDate: data.otherNdeRequestDate || null, ndeResult: data.otherNdeResult, ndeReportNumber: data.otherNdeReport,
                pwhtRequestDate: data.pwhtRequestDate || null, pwhtResult: data.pwhtResult, pwhtReportNumber: data.pwhtReport,
                girthWeldCoatingType: data.girthWeldCoatingType, coatingDate: data.coatingDate || null, coatingRFI: data.coatingRfi, holidayReportNumber: data.holidayReport, loweringRFINumber: data.loweringRfi, backfillRFINumber: data.backfillRfi,
              };

              const handleError = (err) => {
                console.error(err);
                const errorMsg =
                  err.response?.data?.message ||
                  err.response?.data?.error ||
                  (err.response?.data?.errors && Array.isArray(err.response.data.errors) ? err.response.data.errors.map(e => e.msg || e.message).join(", ") : null) ||
                  "Failed to save record.";
                toast.error(typeof errorMsg === 'string' ? errorMsg : "Failed to save record.");
              };

              if (editingRecord) {
                updateMutation.mutate(
                  { id: editingRecord.id || editingRecord._id, payload: mappedPayload },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["masterDatabase"] });
                      toast.success("Record updated successfully!");
                      setIsAdding(false);
                      setEditingRecord(null);
                    },
                    onError: handleError
                  }
                );
              } else {
                createMutation.mutate(
                  mappedPayload,
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["masterDatabase"] });
                      toast.success("Record created successfully!");
                      setIsAdding(false);
                      setEditingRecord(null);
                      setCursor(null);
                      setPrevCursor(null);
                      setPage(1);
                    },
                    onError: handleError
                  }
                );
              }
            }}
            onCancel={() => { setIsAdding(false); setEditingRecord(null); }}
          />
        </DialogContent>
      </Dialog>

      {/* Master Table */}
      {isLoading ? (
        <div className="p-4 text-gray-600">Loading master database...</div>
      ) : error ? (
        <div className="p-4 text-gray-700">Error loading master database: {error.message}</div>
      ) : masterData.length > 0 ? (
        <MasterDatabaseTable
          data={masterData}
          pagination={pagination}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          page={page}
          isFetching={isFetching || isLoading}
          search={search}
          onSearchChange={setSearch}
          searchBy={searchBy}
          onSearchByChange={setSearchBy}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ) : (
        <div className="text-center py-8 text-gray-400">No records found</div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this Master Database record for Line {recordToDelete?.lineNumber}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MasterDatabase;