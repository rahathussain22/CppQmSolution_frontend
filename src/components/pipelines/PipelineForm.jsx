import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function PipelineForm({
  pipeline,
  isEditing,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const [formData, setFormData] = useState({
    lineNumber: "",
    lineSize: "",
    lineClass: "",
    location: "",
  });

  useEffect(() => {
    if (pipeline && isEditing) {
      setFormData(pipeline);
    } else if (!isEditing) {
      setFormData({
        lineNumber: "",
        lineSize: "",
        lineClass: "",
        location: "",
      });
    }
  }, [pipeline, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      {/* Header */}
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Pipelines</h2>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4">
        {/* Row 1: Line Number and Line Size */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Line Number *:
            </label>
            <input
              type="text"
              value={formData.lineNumber}
              onChange={(e) => updateField("lineNumber", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 12-P-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Line Size *:
            </label>
            <input
              type="text"
              value={formData.lineSize}
              onChange={(e) => updateField("lineSize", e.target.value)}
              disabled={!isEditing}
              placeholder='e.g., 24"'
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Line Class *:
            </label>
            <input
              type="text"
              value={formData.lineClass}
              onChange={(e) => updateField("lineClass", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 300#"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Location *:
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., KP 0+000 to KP 5+500"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-700 rounded hover:bg-black"
            disabled={isSaving}
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
