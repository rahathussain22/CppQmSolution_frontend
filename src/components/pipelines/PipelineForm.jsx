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
    lotCode: "",
    name: "",
    description: "",
    startDate: "",
    cuttOffDate: "",
    lineNumber: "",
    lineSize: "",
    lineClass: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    if (pipeline && isEditing) {
      setFormData(pipeline);
    } else if (!isEditing) {
      setFormData({
        lotCode: "",
        name: "",
        description: "",
        startDate: "",
        cuttOffDate: "",
        lineNumber: "",
        lineSize: "",
        lineClass: "",
        location: "",
        status: "",
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
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      {/* Header */}
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Pipelines</h2>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4">
        {/* Row 1: Lot Code and Name */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Lot Code *:
            </label>
            <input
              type="text"
              value={formData.lotCode}
              onChange={(e) => updateField("lotCode", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., LOT-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">Name *:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., Pipeline Section A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="col-span-5">
            <label className="block text-xs text-gray-700 mb-1">Status:</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">-- Select Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={!isEditing}
              placeholder="Enter pipeline description"
              rows="2"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Row 3: Start Date and Cutoff Date */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Start Date:
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Cutoff Date:
            </label>
            <input
              type="date"
              value={formData.cuttOffDate}
              onChange={(e) => updateField("cuttOffDate", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Row 4: Line Class and Location */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-2">
            <label className="block text-xs text-gray-700 mb-1">
              Line Class *:
            </label>
            <input
              type="text"
              value={formData.lineClass}
              onChange={(e) => updateField("lineClass", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 300#"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="col-span-10">
            <label className="block text-xs text-gray-700 mb-1">
              Location *:
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., KP 0+000 to KP 5+500"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700"
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
