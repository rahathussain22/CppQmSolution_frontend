import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const LOCATION_OPTIONS = ["Lot A", "Lot B", "Lot C", "Lot D"];
const STATUS_OPTIONS = ["Mobilized", "De-mobilized", "Revoked","Approved","Rejected","Submitted","Initial Production"];

export function WelderForm({
  welder,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: welder?.name || "",
    jccNumber: welder?.jccNumber || "",
    symbol: welder?.symbol || "",
    welderId: welder?.welderId || "",
    cpp: welder?.cpp || "",
    ilfOrBoc: welder?.ilfOrBoc || "",
    dateOfTest: welder?.dateOfTest || "",
    weldingProcess: welder?.weldingProcess || "",
    material: welder?.material || "",
    thickessRange: welder?.thickessRange || "",
    diameterRange: welder?.diameterRange || "",
    location: welder?.location || "",
    status: welder?.status || "",
    remarks: welder?.remarks || "",
    file: null,
  });

  useEffect(() => {
    setFormData({
      name: welder?.name || "",
      jccNumber: welder?.jccNumber || "",
      symbol: welder?.symbol || "",
      welderId: welder?.welderId || "",
      cpp: welder?.cpp || "",
      ilfOrBoc: welder?.ilfOrBoc || "",
      dateOfTest: welder?.dateOfTest || "",
      weldingProcess: welder?.weldingProcess || "",
      material: welder?.material || "",
      thickessRange: welder?.thickessRange || "",
      diameterRange: welder?.diameterRange || "",
      location: welder?.location || "",
      status: welder?.status || "",
      remarks: welder?.remarks || "",
      file: null,
    });
  }, [welder, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "file") {
        if (value) data.append("file", value);
      } else {
        data.append(key, value ?? "");
      }
    });
    onSave(data);
  };

  const isValid = formData.name && formData.welderId;

  const inputClass = "w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100";
  const selectClass = "w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 bg-white";
  const labelClass = "block text-xs text-gray-700 mb-1";

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Welder Details</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-3">

        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <label className={labelClass}>Name of Welder *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., John Ahmed"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>JCC No.</label>
            <input
              type="text"
              value={formData.jccNumber}
              onChange={(e) => updateField("jccNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., JCC-2024-001"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Symbol</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => updateField("symbol", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., JA-01"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Welder's ID / Passport No. *</label>
            <input
              type="text"
              value={formData.welderId}
              onChange={(e) => updateField("welderId", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., P-123456"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <label className={labelClass}>CPP</label>
            <input
              type="text"
              value={formData.cpp}
              onChange={(e) => updateField("cpp", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., CPP-TRF-2024-01"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>ILF / BOC</label>
            <input
              type="text"
              value={formData.ilfOrBoc}
              onChange={(e) => updateField("ilfOrBoc", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., ILF-2024-055"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Date of Test</label>
            <input
              type="date"
              value={formData.dateOfTest}
              onChange={(e) => updateField("dateOfTest", e.target.value)}
              disabled={!isEditing || isSaving}
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Welding Process</label>
            <input
              type="text"
              value={formData.weldingProcess}
              onChange={(e) => updateField("weldingProcess", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., SMAW"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <label className={labelClass}>Material</label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => updateField("material", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Carbon Steel A106"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Thickness Range</label>
            <input
              type="text"
              value={formData.thickessRange}
              onChange={(e) => updateField("thickessRange", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 6mm - 25mm"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Diameter Range</label>
            <input
              type="text"
              value={formData.diameterRange}
              onChange={(e) => updateField("diameterRange", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 50mm - 300mm"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>Location</label>
            <select
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              disabled={!isEditing || isSaving}
              className={selectClass}
            >
              <option value="">Select location</option>
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <label className={labelClass}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing || isSaving}
              className={selectClass}
            >
              <option value="">Select status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="col-span-6">
            <label className={labelClass}>Remarks</label>
            <input
              type="text"
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Any additional remarks"
              className={inputClass}
            />
          </div>
          <div className="col-span-3">
            <label className={labelClass}>File</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => updateField("file", e.target.files?.[0] || null)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100 file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-800 file:text-white cursor-pointer"
            />
            {welder?.fileUrl && (
              <a
                href={welder.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
              >
                View existing file
              </a>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
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