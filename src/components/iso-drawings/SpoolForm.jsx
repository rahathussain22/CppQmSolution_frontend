import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function SpoolForm({
  spool,
  isEditing,
  onSave,
  onCancel,
  isSaving = false,
  isoDrawingId,
}) {
  const [formData, setFormData] = useState({
    spoolNumber: "",
    description: "",
    type: "",
    weight: "",
    isActive: true,
  });

  useEffect(() => {
    if (spool && isEditing) {
      setFormData({
        spoolNumber: spool.spoolNumber || "",
        description: spool.description || "",
        type: spool.type || "",
        weight: spool.weight ?? "",
        isActive: spool.isActive ? 1 : 0,
      });
    } else if (!isEditing) {
      setFormData({
        spoolNumber: "",
        description: "",
        type: "",
        weight: "",
        isActive: 1,
      });
    }
  }, [spool, isEditing]);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      isoDrawingId,
    };
    onSave(payload);
  };

  const isValid = !!formData.spoolNumber;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Spools</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Spool Number *
            </label>
            <input
              type="text"
              value={formData.spoolNumber}
              onChange={(e) => updateField("spoolNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => updateField("type", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Weight</label>
            <input
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) =>
                updateField(
                  "weight",
                  e.target.value ? parseFloat(e.target.value) : ""
                )
              }
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-700 mb-1">Active</label>
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={formData.isActive === 1}
                onChange={(e) =>
                  updateField("isActive", e.target.checked ? 1 : 0)
                }
                disabled={!isEditing}
                className="size-4 rounded-lg"
              />
              <span className="text-sm text-gray-600">Is Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={!isEditing || isSaving}
              rows={2}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700"
            disabled={isSaving || !isValid}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SpoolForm;
