import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BulkUploadRFI({ isLoading, onUpload, onCancel }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Please select a valid Excel or CSV file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    onUpload(file);
  };

  const handleCancel = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onCancel();
  };

  return (
    <div className="bg-linear-to-b from-green-50 to-green-100 border-2 border-green-300 rounded shadow-md p-4">
      <div className="bg-linear-to-b from-green-600 to-green-700 text-white px-3 py-2 rounded mb-4 flex items-center justify-between">
        <h3 className="font-bold text-sm">Bulk Upload RFI Logs</h3>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-600">
          Select an Excel or CSV file to import multiple RFI records at once.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="px-3 py-2 text-sm bg-white border border-gray-400 rounded hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
            accept=".xlsx,.xls,.csv"
          />
          {file && (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-gray-700 font-medium">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleUpload}
            disabled={isLoading || !file}
            className="px-4 py-1 text-sm bg-green-600 text-white border border-green-700 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:border-gray-400"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50 disabled:bg-gray-100"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
