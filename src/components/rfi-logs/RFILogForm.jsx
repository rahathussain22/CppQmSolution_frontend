import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DISCIPLINES = [
  "Civil",
  "Mechanical",
  "Welding",
  "Coating",
  "Cathodic Protection",
  "Electrical",
  "Instrumentation",
  "Telecom",
];

const INSPECTION_LEVELS = ["Hold", "Witness"];
const COMPANY_INSPECTION_LEVELS = ["Witness", "Surveillance"];

const STATUSES = ["Open", "Accepted & Closed", "Rejected", "Cancelled"];

export function RFILogForm({
  rfiLog,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    rfiNumber: rfiLog?.rfiNumber || "",
    discipline: rfiLog?.discipline || "",
    itpNumber: rfiLog?.itpNumber || "",
    reportNumber: rfiLog?.reportNumber || "",
    description: rfiLog?.description || "",
    location: rfiLog?.location || "",
    inspectionLevel: rfiLog?.inspectionLevel || "",
    drawingNumber: rfiLog?.drawingNumber || "",
    dateOfInspection: rfiLog?.dateOfInspection || "",
    timeOfInspection: rfiLog?.timeOfInspection || "",
    qc: rfiLog?.qc || "",
    pmt: rfiLog?.pmt || "",
    remarks: rfiLog?.remarks || "",
    status: rfiLog?.status || "Open",
    companyInspectionLevel: rfiLog?.companyInspectionLevel || "",
    companyQC: rfiLog?.companyQC || "",
  });

  useEffect(() => {
    setFormData({
      rfiNumber: rfiLog?.rfiNumber || "",
      discipline: rfiLog?.discipline || "",
      itpNumber: rfiLog?.itpNumber || "",
      reportNumber: rfiLog?.reportNumber || "",
      description: rfiLog?.description || "",
      location: rfiLog?.location || "",
      inspectionLevel: rfiLog?.inspectionLevel || "",
      drawingNumber: rfiLog?.drawingNumber || "",
      dateOfInspection: rfiLog?.dateOfInspection || "",
      timeOfInspection: rfiLog?.timeOfInspection || "",
      qc: rfiLog?.qc || "",
      pmt: rfiLog?.pmt || "",
      remarks: rfiLog?.remarks || "",
      status: rfiLog?.status || "Open",
      companyInspectionLevel: rfiLog?.companyInspectionLevel || "",
      companyQC: rfiLog?.companyQC || "",
    });
  }, [rfiLog, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      if (isEditing) {
        // For updates, send FormData (to support future file uploads, etc.)
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
          const value = formData[key];
          // Only append non-empty values (skip empty strings, send null as is)
          if (value !== "") {
            formDataObj.append(key, value === "" ? null : value);
          }
        });

        onSave(formDataObj);
      } else {
        // For creations, send plain JSON object
        onSave(formData);
      }
    }
  };

  const isValid =
    formData.rfiNumber &&
    formData.discipline &&
    formData.itpNumber &&
    formData.reportNumber &&
    formData.inspectionLevel &&
    formData.companyInspectionLevel &&
    formData.qc &&
    formData.pmt;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold">
          {isEditing ? "Edit RFI Log" : "Create RFI Log"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* RFI Number */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              RFI Number *
            </label>
            <input
              type="text"
              value={formData.rfiNumber}
              onChange={(e) => updateField("rfiNumber", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., RFI-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Discipline */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Discipline *
            </label>
            <select
              value={formData.discipline}
              onChange={(e) => updateField("discipline", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select Discipline</option>
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {/* ITP Number */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              ITP Number *
            </label>
            <input
              type="text"
              value={formData.itpNumber}
              onChange={(e) => updateField("itpNumber", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., ITP-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Report Number */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Report Number *
            </label>
            <input
              type="text"
              value={formData.reportNumber}
              onChange={(e) => updateField("reportNumber", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., REP-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* Description */}
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={isSaving}
              placeholder="Description..."
              rows="2"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Location */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., Site A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Drawing Number */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Drawing Number
            </label>
            <input
              type="text"
              value={formData.drawingNumber}
              onChange={(e) => updateField("drawingNumber", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., DRW-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* Inspection Level */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Inspection Level *
            </label>
            <select
              value={formData.inspectionLevel}
              onChange={(e) => updateField("inspectionLevel", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select Inspection Level</option>
              {INSPECTION_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          {/* Company Inspection Level */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Company Inspection Level *
            </label>
            <select
              value={formData.companyInspectionLevel}
              onChange={(e) => updateField("companyInspectionLevel", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select Company Inspection Level</option>
              {COMPANY_INSPECTION_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          {/* Date of Inspection */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Date of Inspection
            </label>
            <input
              type="date"
              value={formData.dateOfInspection}
              onChange={(e) => updateField("dateOfInspection", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Time of Inspection */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Time of Inspection
            </label>
            <input
              type="time"
              value={formData.timeOfInspection}
              onChange={(e) => updateField("timeOfInspection", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* QC */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">QC *</label>
            <input
              type="text"
              value={formData.qc}
              onChange={(e) => updateField("qc", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., QC Name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Company QC */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Company QC
            </label>
            <input
              type="text"
              value={formData.companyQC}
              onChange={(e) => updateField("companyQC", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., Company QC"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* PMT */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">PMT *</label>
            <input
              type="text"
              value={formData.pmt}
              onChange={(e) => updateField("pmt", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., PMT Name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          {/* Status */}
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-3">
          {/* Remarks */}
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              disabled={isSaving}
              placeholder="Remarks..."
              rows="2"
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
