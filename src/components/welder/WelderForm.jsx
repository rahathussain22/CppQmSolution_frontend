import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { Button } from "@/components/ui/button";

export function WelderForm({
  welder,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    projectId: welder?.projectId || 0,
    stampNumber: welder?.stampNumber || "",
    name: welder?.name || "",
    employeeId: welder?.employeeId || "",
    company: welder?.company || "",
    nationality: welder?.nationality || "",
    passportNumber: welder?.passportNumber || "",
    contactNumber: welder?.contactNumber || "",
    qualificationDate: welder?.qualificationDate || "",
    expiryDate: welder?.expiryDate || "",
    status: welder?.status || "Active",
  });

  const {
    data: availableProjects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ createdBy: user.id }),
    select: (data) => (data && data.projects) || [],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFormData({
      projectId: welder?.projectId || 0,
      stampNumber: welder?.stampNumber || "",
      name: welder?.name || "",
      employeeId: welder?.employeeId || "",
      company: welder?.company || "",
      nationality: welder?.nationality || "",
      passportNumber: welder?.passportNumber || "",
      contactNumber: welder?.contactNumber || "",
      qualificationDate: welder?.qualificationDate || "",
      expiryDate: welder?.expiryDate || "",
      status: welder?.status || "Active",
    });
  }, [welder, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid =
    formData.projectId &&
    formData.stampNumber &&
    formData.name &&
    formData.employeeId &&
    formData.company &&
    formData.nationality &&
    formData.passportNumber &&
    formData.contactNumber &&
    formData.qualificationDate &&
    formData.expiryDate &&
    formData.status;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Welder Management</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project *
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => updateField("projectId", Number(e.target.value))}
              disabled={!isEditing || isLoadingProjects || errorProjects}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {errorProjects ? (
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
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Stamp Number *
            </label>
            <input
              type="text"
              value={formData.stampNumber}
              onChange={(e) => updateField("stampNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., STAMP-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Welder name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Employee ID *
            </label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => updateField("employeeId", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., EMP-123"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Company name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Nationality *
            </label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Indian"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Passport Number *
            </label>
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => updateField("passportNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., P1234567"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) => updateField("contactNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., +1234567890"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Qualification Date *
            </label>
            <input
              type="date"
              value={formData.qualificationDate}
              onChange={(e) => updateField("qualificationDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => updateField("expiryDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
            </select>
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
