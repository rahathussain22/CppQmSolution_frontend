import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const STATUSES = ["Open", "Accepted & Closed", "Rejected", "Cancelled"];

export function SubmitFinalInspectionDialog({
  open,
  rfiLog,
  isSaving,
  onSubmit,
  onCancel,
}) {
  const [status, setStatus] = useState("Accepted & Closed");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("status", status);
    if (file) {
      formData.append("file", file);
    }
    onSubmit(formData);
  };

  const handleClose = () => {
    setStatus("Accepted & Closed");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onCancel();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Final Inspection</AlertDialogTitle>
          <AlertDialogDescription>
            {rfiLog?.rfiNumber && `RFI: ${rfiLog.rfiNumber}`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSaving}
              className="w-full px-3 py-2 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSaving}
                className="px-3 py-2 text-sm bg-white border border-gray-400 rounded hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                disabled={isSaving}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
              {file && (
                <span className="text-xs text-gray-600">{file.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <AlertDialogCancel
            onClick={handleClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50 disabled:bg-gray-100"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={isSaving || !status}
            className="px-4 py-2 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:border-gray-400"
          >
            {isSaving ? "Submitting..." : "Submit"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
