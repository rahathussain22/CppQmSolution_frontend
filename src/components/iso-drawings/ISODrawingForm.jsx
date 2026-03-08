import { useState, useEffect } from "react";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ISODrawingForm({
  drawing,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    drawingNumber: drawing?.drawingNumber || "",
    title: drawing?.title || "",
    revisionNumber: drawing?.revisionNumber || "",
    issuedAs: drawing?.issuedAs || "",
    spoolNumber: drawing?.spoolNumber || "",
    sheetNumber: drawing?.sheetNumber || "",
    lineNumber: drawing?.lineNumber || "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setFormData({
      drawingNumber: drawing?.drawingNumber || "",
      title: drawing?.title || "",
      revisionNumber: drawing?.revisionNumber || "",
      issuedAs: drawing?.issuedAs || "",
      spoolNumber: drawing?.spoolNumber || "",
      sheetNumber: drawing?.sheetNumber || "",
      lineNumber: drawing?.lineNumber || "",
    });
    setSelectedFile(null);
  }, [drawing, isEditing]);

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
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (selectedFile) fd.append("file", selectedFile);
    onSave(fd);
  };

  const isValid =
    formData.drawingNumber &&
    formData.sheetNumber &&
    formData.title &&
    formData.lineNumber &&
    formData.revisionNumber &&
    formData.issuedAs &&
    (selectedFile || isEditing);

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">ISO Drawings</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing No. *:
            </label>
            <input
              type="text"
              value={formData.drawingNumber}
              onChange={(e) => updateField("drawingNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., ISO-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Sheet No. *:
            </label>
            <input
              type="text"
              value={formData.sheetNumber}
              onChange={(e) => updateField("sheetNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 1"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Spool No.:
            </label>
            <input
              type="text"
              value={formData.spoolNumber}
              onChange={(e) => updateField("spoolNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., SP-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Main Pipeline"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Line No. *:
            </label>
            <input
              type="text"
              value={formData.lineNumber}
              onChange={(e) => updateField("lineNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., LN-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Revision No. *:
            </label>
            <input
              type="text"
              value={formData.revisionNumber}
              onChange={(e) => updateField("revisionNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 1"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Issued As *:
            </label>
            <input
              type="text"
              value={formData.issuedAs}
              onChange={(e) => updateField("issuedAs", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., For Review"
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
                    <File size={16} className="text-gray-800" />
                    <span className="text-black">{selectedFile.name}</span>
                    <span className="text-gray-800 text-xs">
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
