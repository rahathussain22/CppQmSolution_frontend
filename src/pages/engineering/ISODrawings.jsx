import { useEffect, useState } from "react";
import { ISODrawingForm } from "@/components/iso-drawings/ISODrawingForm";
import { ISODrawingsTable } from "@/components/iso-drawings/ISODrawingsTable";
import { createISODrawing, getISODrawings } from "@/api/iso-drawings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export default function ISODrawings() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingDrawing, setEditingDrawing] = useState(null);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
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

  // Debounce search input to avoid firing a query on every keystroke
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(handle);
  }, [search]);

  const effectiveSearchBy = debouncedSearch ? searchBy : "";

  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      "isoDrawings",
      {
        cursor,
        prevCursor,
        limit,
        search: debouncedSearch,
        searchBy: effectiveSearchBy,
        startDate,
        endDate,
      },
    ],
    queryFn: () =>
      getISODrawings({
        cursor,
        prevCursor,
        limit,
        search: debouncedSearch || undefined,
        searchBy: effectiveSearchBy || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const drawings = data?.isoDrawings || [];
  const pagination = data?.pagination || {
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

  const createDrawingMutation = useMutation({
    mutationFn: (data) => createISODrawing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      resetPagination();
      setMode("idle");
      setEditingDrawing(null);
      toast.success("ISO Drawing has been saved.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save ISO Drawing.");
    },
  });

  const handleAdd = () => {
    resetPagination();
    setEditingDrawing(null);
    setMode("adding");
  };

  const handleEdit = (drawing) => {
    resetPagination();
    setEditingDrawing(drawing);
    setMode("editing");
  };

  // approve/reject/revision flows removed — drawings are created as accepted

  const handleSave = (formData) => {
    createDrawingMutation.mutate(formData);
  };

  const handleCancel = () => {
    setEditingDrawing(null);
    setMode("idle");
  };

  const handleSelectDrawing = (drawing) => {
    setSelectedDrawing(drawing);
    setMode("idle");
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <h4 className="text-3xl font-bold">ISO Drawings</h4>
            {canAdd && mode === "idle" && (
              <Button
                onClick={handleAdd}
                className="bg-gray-800 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-black"
              >
                + Add ISO Drawing
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
                    setCursor(null);
                    setPrevCursor(null);
                    setPage(1);
                  }}
                  placeholder="Search drawings..."
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
                    setCursor(null);
                    setPrevCursor(null);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="drawingNumber">Drawing Number</SelectItem>
                    <SelectItem value="sheetNumber">Sheet Number</SelectItem>
                    <SelectItem value="spoolNumber">Spool Number</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="issuedAs">Issued As</SelectItem>
                    <SelectItem value="revisionNumber">Revision</SelectItem>
                    <SelectItem value="lineNumber">Line Number</SelectItem>
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
                    setCursor(null);
                    setPrevCursor(null);
                    setPage(1);
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
                    setCursor(null);
                    setPrevCursor(null);
                    setPage(1);
                  }}
                  className="h-9"
                />
              </div>
            </div>
          </div>
        </div>
        {(mode === "adding" || mode === "editing") && (
          <ISODrawingForm
            drawing={editingDrawing}
            isEditing={mode === "editing" || mode === "adding"}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={createDrawingMutation.isPending}
          />
        )}
        {isLoading ? (
          <div className="p-4 text-gray-600">Loading drawings...</div>
        ) : error ? (
          <div className="p-4 text-red-700">
            Error loading drawings: {error.message}
          </div>
        ) : (
          <ISODrawingsTable
            drawings={drawings}
            selectedDrawing={selectedDrawing}
            onEdit={handleEdit}
            onSelectDrawing={handleSelectDrawing}
            canEdit={canEdit}
            canDelete={canDelete}
            pagination={pagination}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            page={page}
            isFetching={isFetching}
          />
        )}
      </div >

    </>
  );
}
