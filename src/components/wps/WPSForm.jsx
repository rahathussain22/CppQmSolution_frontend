import { useState, useEffect } from "react";
import { Upload, File } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { Button } from "@/components/ui/button";

// Static projects data removed — fetching from API


export function WPSForm({
  wps,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    projectCode: wps?.projectCode || "",
    wpsNumber: wps?.wpsNumber || "",
    weldingProcess: wps?.weldingProcess || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    data: availableProjects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    select: (data) => (data && data.projects) || [],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFormData({
      projectCode: wps?.projectCode || "",
      wpsNumber: wps?.wpsNumber || "",
      weldingProcess: wps?.weldingProcess || "",
    });
    setSelectedFile(null);
  }, [wps, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
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
    onSave({ ...formData, file: selectedFile });
  };

  const isValid =
    formData.projectCode &&
    formData.wpsNumber &&
    formData.weldingProcess &&
    (selectedFile || isEditing);

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">WPS</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project *
            </label>
            <select
              value={formData.projectCode}
              onChange={(e) => updateField("projectCode", e.target.value)}
              disabled={!isEditing || isLoadingProjects || errorProjects}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {errorProjects ? (
                <option>Error loading projects</option>
              ) : (
                <option value="">Select Project</option>
              )}
              {availableProjects.map((project) => (
                <option key={project.id} value={project.projectCode}>
                  {project.projectCode} - {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              WPS Number *:
            </label>
            <input
              type="text"
              value={formData.wpsNumber}
              onChange={(e) => updateField("wpsNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., WPS-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Weld Process *:
            </label>
            <input
              type="text"
              value={formData.weldingProcess}
              onChange={(e) => updateField("weldingProcess", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., GMAW, TIG, SMAW"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              PDF File *:
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
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-300 rounded text-sm">
                    <File size={16} className="text-gray-700" />
                    <span className="text-gray-900">{selectedFile.name}</span>
                    <span className="text-gray-700 text-xs">
                      ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
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
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-800 rounded hover:bg-black"
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
