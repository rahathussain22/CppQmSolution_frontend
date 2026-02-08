import { useState } from "react";
import { ISODrawingForm } from "@/components/iso-drawings/ISODrawingForm";
import { ISODrawingsTable } from "@/components/iso-drawings/ISODrawingsTable";
import { createISODrawing, getISODrawings } from "@/api/iso-drawings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

// Static initial data
const INITIAL_DRAWINGS = [
  {
    id: 1,
    projectCode: "PROJ-001",
    drawingNumber: "ISO-001",
    spoolNumber: "SP-001",
  },
  {
    id: 2,
    projectCode: "PROJ-001",
    drawingNumber: "ISO-002",
    spoolNumber: "SP-002",
  },
  {
    id: 3,
    projectCode: "PROJ-002",
    drawingNumber: "ISO-003",
    spoolNumber: "SP-003",
  },
];

export default function ISODrawings() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // mode: 'idle', 'adding', 'editing'
  const [mode, setMode] = useState("idle");
  const [editingDrawing, setEditingDrawing] = useState(null);
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  const {
    data: drawings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["isoDrawings"],
    queryFn: () => getISODrawings({}),
    select: (data) => (data && data.isoDrawings) || [],
    refetchOnWindowFocus: false,
  });

  const createDrawingMutation = useMutation({
    mutationFn: (data) => createISODrawing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isoDrawings"] });
      setMode("idle");
      setEditingDrawing(null);
      toast.success("ISO Drawing has been saved.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save ISO Drawing.");
    },
  });

  const handleAdd = () => {
    setEditingDrawing(null);
    setMode("adding");
  };

  const handleEdit = (drawing) => {
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
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-bold">ISO Drawings</h4>
          {user.permissions === "all" && mode === "idle" && (
            <Button
              onClick={handleAdd}
              className="bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700"
            >
              + Add ISO Drawing
            </Button>
          )}
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
          />
        )}
      </div>
      {/* approve/reject/revision flows removed — drawings are created as accepted */}
    </>
  );
}
