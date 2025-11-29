import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectForm({
  project,
  isEditing,
  onSave,
  onCancel,
  isSaving,
}) {
  const [formData, setFormData] = useState({
    projectCode: "",
    name: "",
    clientName: "",
    location: "",
    startDate: "",
    cuttOffDate: "",
  });

  useEffect(() => {
    if (project && isEditing) {
      setFormData(project);
    } else if (!isEditing) {
      setFormData({
        projectCode: "",
        name: "",
        clientName: "",
        location: "",
        startDate: "",
        cuttOffDate: "",
      });
    }
  }, [project, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-linear-to-b from-blue-50 to-blue-100 border-2 border-blue-300 rounded shadow-md mb-4">
      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-2">
            <label className="block text-xs text-gray-700 mb-1">
              Project Code *:
            </label>
            <input
              type="text"
              value={formData.projectCode}
              onChange={(e) => updateField("projectCode", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Name *:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Client Name *:
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Start Date *:
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Cutoff Date *:
            </label>
            <input
              type="date"
              value={formData.cuttOffDate}
              onChange={(e) => updateField("cuttOffDate", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-blue-600 text-white border border-blue-700 rounded hover:bg-blue-700"
            disabled={isSaving}
          >
            {isSaving ? <Loader className="size-4 animate-spin" /> : "Save"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
