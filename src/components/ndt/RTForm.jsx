import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NDT_RESULT_OPTIONS,
  REVIEW_OPTIONS,
  RT_RESULT_OPTIONS,
  RT_TRACER_OPTIONS,
} from "./constants";

export function RTForm({ initialValue, isEditing, isSaving, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    requestDate: initialValue?.requestDate || "",
    rfiNumber: initialValue?.rfiNumber || "",
    firstReport: initialValue?.firstReport || "",
    firstResult: initialValue?.firstResult || "",
    tracer1: initialValue?.tracer1 || initialValue?.Tracer1 || "",
    tracer2: initialValue?.tracer2 || initialValue?.Tracer2 || "",
    secondReport: initialValue?.secondReport || "",
    secondResult: initialValue?.secondResult || "",
    filmQuality: initialValue?.filmQuality || "",
    weldQuality: initialValue?.weldQuality || "",
    reviewed: initialValue?.reviewed || "",
  });

  useEffect(() => {
    setFormData({
      requestDate: initialValue?.requestDate || "",
      rfiNumber: initialValue?.rfiNumber || "",
      firstReport: initialValue?.firstReport || "",
      firstResult: initialValue?.firstResult || "",
      tracer1: initialValue?.tracer1 || initialValue?.Tracer1 || "",
      tracer2: initialValue?.tracer2 || initialValue?.Tracer2 || "",
      secondReport: initialValue?.secondReport || "",
      secondResult: initialValue?.secondResult || "",
      filmQuality: initialValue?.filmQuality || "",
      weldQuality: initialValue?.weldQuality || "",
      reviewed: initialValue?.reviewed || "",
    });
  }, [initialValue, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold">
          {initialValue?.id ? "Edit RT Request" : "New RT Request"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Request Date
            </label>
            <input
              type="date"
              value={formData.requestDate}
              onChange={(e) => updateField("requestDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              RFI No. *
            </label>
            <input
              type="text"
              placeholder="e.g., RFI-001"
              value={formData.rfiNumber}
              onChange={(e) => updateField("rfiNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              First Result *
            </label>
            <select
              value={formData.firstResult}
              onChange={(e) => updateField("firstResult", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            >
              <option value="">Select</option>
              {RT_RESULT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              First Report
            </label>
            <input
              type="text"
              placeholder="Report ref"
              value={formData.firstReport}
              onChange={(e) => updateField("firstReport", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Tracer 1</label>
            <select
              value={formData.tracer1}
              onChange={(e) => updateField("tracer1", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {RT_TRACER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Tracer 2</label>
            <select
              value={formData.tracer2}
              onChange={(e) => updateField("tracer2", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {RT_TRACER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Second Report
            </label>
            <input
              type="text"
              placeholder="Report ref"
              value={formData.secondReport}
              onChange={(e) => updateField("secondReport", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Second Result
            </label>
            <select
              value={formData.secondResult}
              onChange={(e) => updateField("secondResult", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {RT_RESULT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Reviewed</label>
            <select
              value={formData.reviewed}
              onChange={(e) => updateField("reviewed", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {NDT_RESULT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Film Quality
            </label>
            <select
              value={formData.filmQuality}
              onChange={(e) => updateField("filmQuality", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {REVIEW_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Weld Quality
            </label>
            <select
              value={formData.weldQuality}
              onChange={(e) => updateField("weldQuality", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select</option>
              {REVIEW_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-x-2">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-800 rounded hover:bg-black"
            disabled={!isEditing || isSaving}
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

