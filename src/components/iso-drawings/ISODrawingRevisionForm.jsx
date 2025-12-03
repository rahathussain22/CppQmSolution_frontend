import { useState, useEffect } from "react";
import { Upload, File } from "lucide-react";

export function ISODrawingRevisionForm({
  drawing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    sheetNumber: drawing?.sheetNumber || "",
    drawingTitle: drawing?.drawingTitle || "",
    issueDate: drawing?.issueDate || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setFormData({
      sheetNumber: drawing?.sheetNumber || "",
      drawingTitle: drawing?.drawingTitle || "",
      issueDate: drawing?.issueDate || "",
    });
    setSelectedFile(null);
  }, [drawing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = ["jpeg", "jpg", "png", "pdf", "dwg"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert(
          "Invalid file format. Please upload jpeg, jpg, png, pdf, or dwg files only."
        );
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("isoDrawingId", drawing.id);
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (selectedFile) fd.append("file", selectedFile);
    onSave(fd);
  };

  const isValid =
    formData.sheetNumber &&
    formData.drawingTitle &&
    formData.issueDate &&
    selectedFile;

  return (
    <div className="bg-linear-to-b from-orange-50 to-orange-100 border-2 border-orange-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-orange-600 to-orange-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">
          Send Revision - {drawing?.drawingNumber}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Sheet Number *:
            </label>
            <input
              type="text"
              value={formData.sheetNumber}
              onChange={(e) => updateField("sheetNumber", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., 1 of 3"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing Title *:
            </label>
            <input
              type="text"
              value={formData.drawingTitle}
              onChange={(e) => updateField("drawingTitle", e.target.value)}
              disabled={isSaving}
              placeholder="Drawing title"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Issue Date *:
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => updateField("issueDate", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing File (jpeg, jpg, png, pdf, dwg) *:
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-400 rounded cursor-pointer hover:bg-gray-50">
                <Upload size={16} className="text-gray-600" />
                <span className="text-sm">Choose File</span>
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.pdf,.dwg"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSaving}
                />
              </label>
              {selectedFile && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-300 rounded text-sm">
                  <File size={16} className="text-blue-600" />
                  <span className="text-blue-700">{selectedFile.name}</span>
                  <span className="text-blue-500 text-xs">
                    ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              )}
              {!selectedFile && (
                <span className="text-sm text-gray-500 px-2 py-1">
                  No file selected
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-orange-600 text-white border border-orange-700 rounded hover:bg-orange-700"
            disabled={isSaving || !isValid}
          >
            {isSaving ? "Sending..." : "Send Revision"}
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
