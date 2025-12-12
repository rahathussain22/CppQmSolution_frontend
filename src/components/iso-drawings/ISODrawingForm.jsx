import { useState, useEffect } from "react";
import { Upload, File } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { getPipelines } from "../../api/pipelines";

export function ISODrawingForm({
  drawing,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    projectId: drawing?.projectId || 0,
    pipelineId: drawing?.pipelineId || 0,
    drawingNumber: drawing?.drawingNumber || "",
    sheetNumber: drawing?.sheetNumber || "",
    drawingTitle: drawing?.drawingTitle || "",
    issueDate: drawing?.issueDate || "",
    revision: drawing?.revision != null ? String(drawing.revision) : "",
    approvedBy: drawing?.approvedBy || user?.name || "",
    approvedDate:
      drawing?.approvedDate || new Date().toISOString().slice(0, 10),
  });
  const [selectedFile, setSelectedFile] = useState(null);

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
  const {
    data: availablePipelines = [],
    isLoading: isLoadingPipelines,
    error: errorPipelines,
  } = useQuery({
    queryKey: ["pipelines", formData.projectId],
    queryFn: () => getPipelines({ projectId: formData.projectId }),
    select: (data) => (data && data.pipelines) || [],
    enabled: !!formData.projectId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFormData({
      projectId: drawing?.projectId || 0,
      pipelineId: drawing?.pipelineId || 0,
      drawingNumber: drawing?.drawingNumber || "",
      sheetNumber: drawing?.sheetNumber || "",
      drawingTitle: drawing?.drawingTitle || "",
      issueDate: drawing?.issueDate || "",
      revision: drawing?.revision != null ? String(drawing.revision) : "",
      approvedBy: drawing?.approvedBy || user?.name || "",
      approvedDate:
        drawing?.approvedDate || new Date().toISOString().slice(0, 10),
    });
    setSelectedFile(null);
  }, [drawing, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // If changing project, reset pipelineId
    if (field === "projectId") {
      setFormData((prev) => ({ ...prev, pipelineId: 0 }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Accept only PDFs for ISO Drawings
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension === "pdf") {
        setSelectedFile(file);
      } else {
        alert("Invalid file format. Please upload PDF files only.");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      // append all fields (including approved fields). Skip undefined/null
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (selectedFile) fd.append("file", selectedFile);
    onSave(fd);
  };

  const isValid =
    formData.projectId &&
    formData.pipelineId &&
    formData.drawingNumber &&
    formData.sheetNumber &&
    formData.drawingTitle &&
    formData.issueDate &&
    formData.approvedBy &&
    formData.approvedDate &&
    (selectedFile || isEditing);

  return (
    <div className="bg-gradient-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-gradient-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">ISO Drawings</h2>
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
              Pipeline *
            </label>
            <select
              value={formData.pipelineId}
              onChange={(e) =>
                updateField("pipelineId", Number(e.target.value))
              }
              disabled={
                !isEditing ||
                !formData.projectId ||
                isLoadingPipelines ||
                errorPipelines
              }
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {!formData.projectId ? (
                <option value={0}>Select project first</option>
              ) : errorPipelines ? (
                <option>Error loading pipelines</option>
              ) : (
                <option value={0}>Select Pipeline</option>
              )}
              {availablePipelines.map((pipeline) => (
                <option key={pipeline.id} value={pipeline.id}>
                  {pipeline.lineNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing Number *:
            </label>
            <input
              type="text"
              value={formData.drawingNumber}
              onChange={(e) => updateField("drawingNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., ISO-A2ZKK-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Sheet Number *:
            </label>
            <input
              type="text"
              value={formData.sheetNumber}
              onChange={(e) => updateField("sheetNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 1 of 3"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing Title *:
            </label>
            <input
              type="text"
              value={formData.drawingTitle}
              onChange={(e) => updateField("drawingTitle", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Drawing title"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Issue Date *:
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => updateField("issueDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Revision</label>
            <input
              type="text"
              value={formData.revision}
              onChange={(e) => updateField("revision", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., A, 1, rev-1"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-5">
            <label className="block text-xs text-gray-700 mb-1">
              Approved By
            </label>
            <input
              type="text"
              value={formData.approvedBy}
              onChange={(e) => updateField("approvedBy", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Approver name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Approved Date
            </label>
            <input
              type="date"
              value={formData.approvedDate}
              onChange={(e) => updateField("approvedDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing File (PDF only):
            </label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-400 rounded cursor-pointer hover:bg-gray-50">
                  <Upload size={16} className="text-gray-600" />
                  <span className="text-sm">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSaving}
                  />
                </label>
                {selectedFile && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-300 rounded text-sm">
                    <File size={16} className="text-red-600" />
                    <span className="text-red-700">{selectedFile.name}</span>
                    <span className="text-red-500 text-xs">
                      ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                )}
                {!selectedFile && !isEditing && (
                  <span className="text-sm text-gray-500 px-2 py-1">
                    No file selected
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 px-2 py-1">
                  File uploading only available in edit mode.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700"
            disabled={isSaving || !isValid}
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
