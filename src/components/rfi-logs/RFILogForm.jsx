import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function RFILogForm({
  rfiLog,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    cppRFINo: rfiLog?.cppRFINo || "",
    rfiNo: rfiLog?.rfiNo || "",
    projectCode: rfiLog?.projectCode || "",
    descipline: rfiLog?.descipline || "",
    itpNumber: rfiLog?.itpNumber || "",
    reportNumber: rfiLog?.reportNumber || "",
    description: rfiLog?.description || "",
    location: rfiLog?.location || "",
    inspectionOfficerName: rfiLog?.inspectionOfficerName || "",
    inspectionLevel: rfiLog?.inspectionLevel || "",
    companyInspectionLevel: rfiLog?.companyInspectionLevel || "",
    drawingNumber: rfiLog?.drawingNumber || "",
    inspectionDate: rfiLog?.inspectionDate || "",
    inspectionTime: rfiLog?.inspectionTime || "",
    cppQc: rfiLog?.cppQc || "",
    companyQc: rfiLog?.companyQc || "",
    pmt: rfiLog?.pmt || "",
    rfiStatus: rfiLog?.rfiStatus || "Pending",
    remarks: rfiLog?.remarks || "",
  });

  useEffect(() => {
    setFormData({
      cppRFINo: rfiLog?.cppRFINo || "",
      rfiNo: rfiLog?.rfiNo || "",
      projectCode: rfiLog?.projectCode || "",
      descipline: rfiLog?.descipline || "",
      itpNumber: rfiLog?.itpNumber || "",
      reportNumber: rfiLog?.reportNumber || "",
      description: rfiLog?.description || "",
      location: rfiLog?.location || "",
      inspectionOfficerName: rfiLog?.inspectionOfficerName || "",
      inspectionLevel: rfiLog?.inspectionLevel || "",
      companyInspectionLevel: rfiLog?.companyInspectionLevel || "",
      drawingNumber: rfiLog?.drawingNumber || "",
      inspectionDate: rfiLog?.inspectionDate || "",
      inspectionTime: rfiLog?.inspectionTime || "",
      cppQc: rfiLog?.cppQc || "",
      companyQc: rfiLog?.companyQc || "",
      pmt: rfiLog?.pmt || "",
      rfiStatus: rfiLog?.rfiStatus || "Pending",
      remarks: rfiLog?.remarks || "",
    });
  }, [rfiLog, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid =
    formData.cppRFINo && formData.descipline && formData.projectCode;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">RFI Logs</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              CPP RFI No *
            </label>
            <input
              type="text"
              value={formData.cppRFINo}
              onChange={(e) => updateField("cppRFINo", e.target.value)}
              disabled={!isEditing || isSaving || rfiLog}
              placeholder="e.g., CPP-RFI-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">RFI No</label>
            <input
              type="text"
              value={formData.rfiNo}
              onChange={(e) => updateField("rfiNo", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., RFI-123"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project Code *
            </label>
            <input
              type="text"
              value={formData.projectCode}
              onChange={(e) => updateField("projectCode", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., PROJ-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Discipline *
            </label>
            <input
              type="text"
              value={formData.descipline}
              onChange={(e) => updateField("descipline", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Mechanical"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              ITP Number
            </label>
            <input
              type="text"
              value={formData.itpNumber}
              onChange={(e) => updateField("itpNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., ITP-456"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Report Number
            </label>
            <input
              type="text"
              value={formData.reportNumber}
              onChange={(e) => updateField("reportNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., REP-789"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Description of the RFI"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Site A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Inspection Officer Name
            </label>
            <input
              type="text"
              value={formData.inspectionOfficerName}
              onChange={(e) =>
                updateField("inspectionOfficerName", e.target.value)
              }
              disabled={!isEditing || isSaving}
              placeholder="Officer name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Inspection Level
            </label>
            <input
              type="text"
              value={formData.inspectionLevel}
              onChange={(e) => updateField("inspectionLevel", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Level 1"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Company Inspection Level
            </label>
            <input
              type="text"
              value={formData.companyInspectionLevel}
              onChange={(e) =>
                updateField("companyInspectionLevel", e.target.value)
              }
              disabled={!isEditing || isSaving}
              placeholder="e.g., Level 2"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing Number
            </label>
            <input
              type="text"
              value={formData.drawingNumber}
              onChange={(e) => updateField("drawingNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., DWG-123"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Inspection Date
            </label>
            <input
              type="date"
              value={formData.inspectionDate}
              onChange={(e) => updateField("inspectionDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Inspection Time
            </label>
            <input
              type="time"
              value={formData.inspectionTime}
              onChange={(e) => updateField("inspectionTime", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">CPP QC</label>
            <input
              type="text"
              value={formData.cppQc}
              onChange={(e) => updateField("cppQc", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="CPP QC name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Company QC
            </label>
            <input
              type="text"
              value={formData.companyQc}
              onChange={(e) => updateField("companyQc", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Company QC name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">PMT</label>
            <input
              type="text"
              value={formData.pmt}
              onChange={(e) => updateField("pmt", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="PMT value"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              RFI Status
            </label>
            <select
              value={formData.rfiStatus}
              onChange={(e) => updateField("rfiStatus", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Remarks</label>
            <input
              type="text"
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Additional remarks"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
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
