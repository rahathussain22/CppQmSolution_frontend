import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { useAuthStore } from "@/store/authStore";

import { createRT, deleteRT, getRT, updateRT, createUT, deleteUT, getUT, updateUT } from "@/api/ndt";
import { normalizeNdtList } from "@/components/ndt/constants";
import { NDTTable } from "@/components/ndt/NDTTable";
import { RTForm } from "@/components/ndt/RTForm";
import { UTForm } from "@/components/ndt/UTForm";

export default function NDTRequest() {
  const user = useAuthStore((state) => state.user);
  const permissions = user?.permissions || "view";

  const canView = useMemo(
    () =>
      permissions === "view" ||
      permissions === "view+add" ||
      permissions === "view+add+update" ||
      permissions === "all",
    [permissions]
  );
  const canAdd = useMemo(
    () =>
      permissions === "view+add" ||
      permissions === "view+add+update" ||
      permissions === "all",
    [permissions]
  );
  const canEdit = useMemo(
    () => permissions === "view+add+update" || permissions === "all",
    [permissions]
  );
  const canDelete = useMemo(() => permissions === "all", [permissions]);

  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("RT");

  const [rtMode, setRtMode] = useState("idle"); // idle | adding | editing
  const [utMode, setUtMode] = useState("idle"); // idle | adding | editing
  const [editingRT, setEditingRT] = useState(null);
  const [editingUT, setEditingUT] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: "RT"|"UT", row }

  // Pagination state
  const PAGE_SIZE = 20;
  const [rtCursor, setRtCursor] = useState(null);
  const [rtPrevCursor, setRtPrevCursor] = useState(null);
  const [rtPage, setRtPage] = useState(1);

  const [utCursor, setUtCursor] = useState(null);
  const [utPrevCursor, setUtPrevCursor] = useState(null);
  const [utPage, setUtPage] = useState(1);

  const rtQuery = useQuery({
    queryKey: ["ndt", "RT", { cursor: rtCursor, prevCursor: rtPrevCursor, limit: PAGE_SIZE }],
    queryFn: () => getRT({ cursor: rtCursor, prevCursor: rtPrevCursor, limit: PAGE_SIZE }),
    enabled: canView,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const utQuery = useQuery({
    queryKey: ["ndt", "UT", { cursor: utCursor, prevCursor: utPrevCursor, limit: PAGE_SIZE }],
    queryFn: () => getUT({ cursor: utCursor, prevCursor: utPrevCursor, limit: PAGE_SIZE }),
    enabled: canView,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const rtResponse = rtQuery.data;
  const utResponse = utQuery.data;

  // Backend returns: { pagination, count, data: [...] }
  const rtRows = normalizeNdtList(rtResponse);
  const utRows = normalizeNdtList(utResponse);

  const rtPagination = rtResponse?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit: PAGE_SIZE,
  };

  const utPagination = utResponse?.pagination || {
    hasNextPage: false,
    nextCursor: null,
    prevCursor: null,
    limit: PAGE_SIZE,
  };

  const handleRtNextPage = () => {
    if (rtPagination?.hasNextPage && rtPagination?.nextCursor) {
      setRtPrevCursor(null);
      setRtCursor(rtPagination.nextCursor);
      setRtPage((prev) => prev + 1);
    }
  };

  const handleRtPrevPage = () => {
    if (rtPagination?.prevCursor) {
      setRtCursor(null);
      setRtPrevCursor(rtPagination.prevCursor);
      setRtPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleUtNextPage = () => {
    if (utPagination?.hasNextPage && utPagination?.nextCursor) {
      setUtPrevCursor(null);
      setUtCursor(utPagination.nextCursor);
      setUtPage((prev) => prev + 1);
    }
  };

  const handleUtPrevPage = () => {
    if (utPagination?.prevCursor) {
      setUtCursor(null);
      setUtPrevCursor(utPagination.prevCursor);
      setUtPage((prev) => Math.max(1, prev - 1));
    }
  };

  const createRTMutation = useMutation({
    mutationFn: (body) => createRT(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "RT"] });
      setRtMode("idle");
      setEditingRT(null);
      toast.success("RT request has been saved.");
    },
    onError: (err) => toast.error(err.message || "Failed to save RT request."),
  });

  const updateRTMutation = useMutation({
    mutationFn: ({ id, body }) => updateRT({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "RT"] });
      setRtMode("idle");
      setEditingRT(null);
      toast.success("RT request has been updated.");
    },
    onError: (err) => toast.error(err.message || "Failed to update RT request."),
  });

  const deleteRTMutation = useMutation({
    mutationFn: ({ id }) => deleteRT({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "RT"] });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      toast.success("RT request has been deleted.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete RT request.");
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    },
  });

  const createUTMutation = useMutation({
    mutationFn: (body) => createUT(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "UT"] });
      setUtMode("idle");
      setEditingUT(null);
      toast.success("UT request has been saved.");
    },
    onError: (err) => toast.error(err.message || "Failed to save UT request."),
  });

  const updateUTMutation = useMutation({
    mutationFn: ({ id, body }) => updateUT({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "UT"] });
      setUtMode("idle");
      setEditingUT(null);
      toast.success("UT request has been updated.");
    },
    onError: (err) => toast.error(err.message || "Failed to update UT request."),
  });

  const deleteUTMutation = useMutation({
    mutationFn: ({ id }) => deleteUT({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ndt", "UT"] });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      toast.success("UT request has been deleted.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete UT request.");
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    },
  });

  const handleAdd = (type) => {
    if (!canAdd) return;
    if (type === "RT") {
      setEditingRT(null);
      setRtMode("adding");
    } else {
      setEditingUT(null);
      setUtMode("adding");
    }
  };

  const handleEdit = (type, row) => {
    if (!canEdit) return;
    if (type === "RT") {
      setEditingRT(row);
      setRtMode("editing");
    } else {
      setEditingUT(row);
      setUtMode("editing");
    }
  };

  const handleCancel = (type) => {
    if (type === "RT") {
      setEditingRT(null);
      setRtMode("idle");
    } else {
      setEditingUT(null);
      setUtMode("idle");
    }
  };

  const handleDelete = (type, row) => {
    if (!canDelete) return;
    setDeleteTarget({ type, row });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget?.row?.id) return;
    if (deleteTarget.type === "RT") {
      deleteRTMutation.mutate({ id: deleteTarget.row.id });
    } else {
      deleteUTMutation.mutate({ id: deleteTarget.row.id });
    }
  };

  const saveRT = (formData) => {
    if (
      !formData?.weldNumber ||
      !formData?.rfiNumber ||
      !formData?.firstResult ||
      !formData?.requestDate ||
      !formData?.firstReport ||
      !formData?.tracer1
    ) {
      toast.error(
        "Weld Number, RFI No., First Result, Request Date, First Report, and Tracer 1 are required."
      );
      return;
    }
    const body = {
      weldNumber: formData.weldNumber,
      requestDate: formData.requestDate,
      rfiNumber: formData.rfiNumber,
      firstReport: formData.firstReport,
      firstResult: formData.firstResult,
      tracer1: formData.tracer1,
      tracer2: formData.tracer2 || undefined,
      secondReport: formData.secondReport || undefined,
      secondResult: formData.secondResult || undefined,
      thirdReport: formData.thirdReport || undefined,
      thirdResult: formData.thirdResult || undefined,
      filmQuality: formData.filmQuality || undefined,
      weldQuality: formData.weldQuality || undefined,
      reviewed: formData.reviewed || undefined,
    };

    if (rtMode === "editing" && editingRT?.id) {
      updateRTMutation.mutate({ id: editingRT.id, body });
    } else {
      createRTMutation.mutate(body);
    }
  };

  const saveUT = (formData) => {
    if (
      !formData?.weldNumber ||
      !formData?.rfiNumber ||
      !formData?.firstResult ||
      !formData?.firstReport ||
      !formData?.tracer1
    ) {
      toast.error(
        "Weld Number, RFI No., First Result, First Report, and Tracer 1 are required."
      );
      return;
    }
    const body = {
      weldNumber: formData.weldNumber,
      utType: formData.utType || undefined,
      requestDate: formData.requestDate || undefined,
      rfiNumber: formData.rfiNumber,
      firstReport: formData.firstReport,
      firstResult: formData.firstResult,
      tracer1: formData.tracer1,
      tracer2: formData.tracer2 || undefined,
      secondReport: formData.secondReport || undefined,
      secondResult: formData.secondResult || undefined,
      thirdReport: formData.thirdReport || undefined,
      thirdResult: formData.thirdResult || undefined,
      ilfAggreement: formData.ilfAggreement || undefined,
      reviewed: formData.reviewed || undefined,
    };

    if (utMode === "editing" && editingUT?.id) {
      updateUTMutation.mutate({ id: editingUT.id, body });
    } else {
      createUTMutation.mutate(body);
    }
  };

  const isSavingRT = createRTMutation.isPending || updateRTMutation.isPending;
  const isSavingUT = createUTMutation.isPending || updateUTMutation.isPending;

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">NDT Requests</h4>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-200/70 border border-gray-300 shadow-xs">
            <TabsTrigger
              value="RT"
              className="px-4 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Radiographic Test (RT)
            </TabsTrigger>
            <TabsTrigger
              value="UT"
              className="px-4 data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Ultrasonic Test (UT)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="RT" className="space-y-4">
            <div className="flex justify-end">
              {canAdd && rtMode === "idle" && (
                <Button
                  onClick={() => handleAdd("RT")}
                  className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
                >
                  + Add RT Request
                </Button>
              )}
            </div>

            {(rtMode === "adding" || rtMode === "editing") && (
              <RTForm
                initialValue={editingRT}
                isEditing={true}
                isSaving={isSavingRT}
                onSave={saveRT}
                onCancel={() => handleCancel("RT")}
              />
            )}

            {!canView ? (
              <div className="p-4 text-gray-600">
                You don&apos;t have permission to view NDT requests.
              </div>
            ) : rtQuery.isLoading ? (
              <div className="p-4 text-gray-600">Loading RT requests...</div>
            ) : rtQuery.error ? (
              <div className="p-4 text-red-700">Error loading RT requests.</div>
            ) : (
              <>
                <NDTTable
                  type="RT"
                  rows={rtRows}
                  onEdit={(row) => handleEdit("RT", row)}
                  onDelete={(row) => handleDelete("RT", row)}
                  canEdit={canEdit}
                  canDelete={canDelete}
                />
                <div className="flex items-center border border-t-0 border-gray-200 bg-gray-50 px-4 py-3 gap-2 rounded-b-md">
                  {/* Previous button - left aligned */}
                  <div className="flex-1">
                    <button
                      onClick={handleRtPrevPage}
                      disabled={rtQuery.isFetching || !rtPagination?.prevCursor || rtPage <= 1}
                      className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                  </div>

                  {/* Page indicator - centered */}
                  <div className="flex-1 text-center text-xs text-gray-600">
                    Page {rtPage}
                  </div>

                  {/* Next button - right aligned */}
                  <div className="flex-1 flex justify-end">
                    <button
                      onClick={handleRtNextPage}
                      disabled={rtQuery.isFetching || !rtPagination?.hasNextPage}
                      className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="UT" className="space-y-4">
            <div className="flex justify-end">
              {canAdd && utMode === "idle" && (
                <Button
                  onClick={() => handleAdd("UT")}
                  className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
                >
                  + Add UT Request
                </Button>
              )}
            </div>

            {(utMode === "adding" || utMode === "editing") && (
              <UTForm
                initialValue={editingUT}
                isEditing={true}
                isSaving={isSavingUT}
                onSave={saveUT}
                onCancel={() => handleCancel("UT")}
              />
            )}

            {!canView ? (
              <div className="p-4 text-gray-600">
                You don&apos;t have permission to view NDT requests.
              </div>
            ) : utQuery.isLoading ? (
              <div className="p-4 text-gray-600">Loading UT requests...</div>
            ) : utQuery.error ? (
              <div className="p-4 text-red-700">Error loading UT requests.</div>
            ) : (
              <>
                <NDTTable
                  type="UT"
                  rows={utRows}
                  onEdit={(row) => handleEdit("UT", row)}
                  onDelete={(row) => handleDelete("UT", row)}
                  canEdit={canEdit}
                  canDelete={canDelete}
                />
                <div className="flex items-center border border-t-0 border-gray-200 bg-gray-50 px-4 py-3 gap-2 rounded-b-md">
                  {/* Previous button - left aligned */}
                  <div className="flex-1">
                    <button
                      onClick={handleUtPrevPage}
                      disabled={utQuery.isFetching || !utPagination?.prevCursor || utPage <= 1}
                      className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                  </div>

                  {/* Page indicator - centered */}
                  <div className="flex-1 text-center text-xs text-gray-600">
                    Page {utPage}
                  </div>

                  {/* Next button - right aligned */}
                  <div className="flex-1 flex justify-end">
                    <button
                      onClick={handleUtNextPage}
                      disabled={utQuery.isFetching || !utPagination?.hasNextPage}
                      className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete NDT Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the{" "}
              <b>{deleteTarget?.type}</b> request for RFI{" "}
              <b>{deleteTarget?.row?.rfiNumber}</b>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteRTMutation.isPending || deleteUTMutation.isPending}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}