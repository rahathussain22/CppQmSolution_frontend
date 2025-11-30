import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { Button } from "@/components/ui/button";

const statusOptions = [
  { value: "not-started", label: "Not Started" },
  { value: "active", label: "Active" },
  { value: "substantially-complete", label: "Substantially Complete" },
  { value: "complete", label: "Complete" },
  { value: "on-hold", label: "On Hold" },
];

export function LotForm({ lot, isEditing, onSave, onCancel, isSaving }) {
  const [formData, setFormData] = useState({
    projectId: 0,
    projectCode: "",
    lotCode: "",
    name: "",
    description: "",
    startDate: "",
    cuttOffDate: "",
    status: "not-started",
  });

  const user = useAuthStore((state) => state.user);
  const {
    data: availableProjects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ createdBy: user.id }),
    select: (data) => (data && data.projects) || [],
  });

  useEffect(() => {
    if (lot && isEditing) {
      setFormData(lot);
    } else if (!isEditing) {
      setFormData({
        projectId: 0,
        projectCode: "",
        lotCode: "",
        name: "",
        description: "",
        startDate: "",
        cuttOffDate: "",
        status: "not-started",
      });
    }
  }, [lot, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (projectId) => {
    const project = availableProjects.find((p) => p.id === projectId);
    if (project) {
      setFormData((prev) => ({
        ...prev,
        projectId: project.id,
        projectCode: project.projectCode,
      }));
    }
  };

  return (
    <div className="bg-linear-to-b from-blue-50 to-blue-100 border-2 border-blue-300 rounded shadow-md mb-4">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project *:
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => handleProjectChange(Number(e.target.value))}
              disabled={!isEditing || isLoading || error}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {error ? (
                <option>Error loading projects</option>
              ) : (
                <option value={0}>Select Project</option>
              )}
              {availableProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectCode} - {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-700 mb-1">
              Lot Code *:
            </label>
            <input
              type="text"
              value={formData.lotCode}
              onChange={(e) => updateField("lotCode", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., LOT-A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Status *:
            </label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Description:
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., Northern segment from Station KP 0 to KP 25"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
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
          <div className="col-span-3">
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
