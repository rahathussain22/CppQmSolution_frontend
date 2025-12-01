import { useState, useEffect } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { useAuthStore } from "../../store/authStore";
import { getLots } from "../../api/lots";

export function PipelineForm({
  pipeline,
  isEditing,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const [formData, setFormData] = useState({
    projectId: 0,
    projectNumber: "",
    lotId: 0,
    lotCode: "",
    lineNumber: "",
    lineSize: "",
    lineClass: "",
    location: "",
  });
  const [filteredLots, setFilteredLots] = useState([]);

  const user = useAuthStore((state) => state.user);

  const {
    data: availableProjects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ createdBy: user.id }),
    select: (data) => (data && data.projects) || [],
  });
  const {
    data: availableLots = [],
    isLoading: isLoadingLots,
    error: errorLots,
    refetch,
  } = useQuery({
    queryKey: ["lots"],
    queryFn: () => getLots({ projectId: formData.projectId }),
    select: (data) => (data && data.lots) || [],
    enabled: !!formData.projectId,
  });

  useEffect(() => {
    if (formData.projectId > 0) {
      setFilteredLots(
        availableLots.filter((lot) => lot.projectId === formData.projectId)
      );
    }
  }, [availableLots, formData.projectId]);

  useEffect(() => {
    if (formData.projectId > 0) {
      refetch();
    }
  }, [formData.projectId, refetch]);

  useEffect(() => {
    if (pipeline && isEditing) {
      setFormData(pipeline);
      setFilteredLots(
        availableLots.filter((lot) => lot.projectId === pipeline.projectId)
      );
    } else if (!isEditing) {
      setFormData({
        projectId: 0,
        projectNumber: "",
        lotId: 0,
        lotCode: "",
        lineNumber: "",
        lineSize: "",
        lineClass: "",
        location: "",
      });
      setFilteredLots(availableLots);
    }
  }, [pipeline, isEditing, availableLots]);

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
        projectNumber: project.projectNumber,
        lotId: 0,
        lotCode: "",
      }));
      setFilteredLots(
        availableLots.filter((lot) => lot.projectId === projectId)
      );
    }
  };

  const handleLotChange = (lotId) => {
    const lot = availableLots.find((l) => l.id === lotId);
    if (lot) {
      setFormData((prev) => ({
        ...prev,
        lotId: lot.id,
        lotCode: lot.lotCode,
      }));
    }
  };

  return (
    <div className="bg-linear-to-b from-blue-50 to-blue-100 border-2 border-blue-300 rounded shadow-md mb-4">
      {/* Header */}
      <div className="bg-linear-to-b from-blue-600 to-blue-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Pipelines</h2>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-4">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project *:
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => handleProjectChange(Number(e.target.value))}
              disabled={!isEditing || isLoadingProjects || !!errorProjects}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value={0}>Select Project</option>
              {availableProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectCode} - {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Lot *:</label>
            <select
              value={formData.lotId}
              onChange={(e) => handleLotChange(Number(e.target.value))}
              disabled={
                !isEditing ||
                !formData.projectId ||
                isLoadingProjects ||
                isLoadingLots ||
                !!errorProjects ||
                !!errorLots
              }
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value={0}>Select Lot</option>
              {filteredLots.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  {lot.lotCode} - {lot.name}
                </option>
              ))}
            </select>
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-3">
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
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-9">
            <label className="block text-xs text-gray-700 mb-1">
              Location *:
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., KP 0+000 to KP 5+500"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-blue-600 text-white border border-blue-700 rounded hover:bg-blue-700"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
