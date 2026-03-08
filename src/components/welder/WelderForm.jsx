import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function WelderForm({
  welder,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    rootA: welder?.rootA || "",
    rootB: welder?.rootB || "",
    fillA: welder?.fillA || "",
    fillB: welder?.fillB || "",
    capA: welder?.capA || "",
    capB: welder?.capB || "",
    weldNumber: welder?.weldNumber || "",
  });

  useEffect(() => {
    setFormData({
      rootA: welder?.rootA || "",
      rootB: welder?.rootB || "",
      fillA: welder?.fillA || "",
      fillB: welder?.fillB || "",
      capA: welder?.capA || "",
      capB: welder?.capB || "",
      weldNumber: welder?.weldNumber || "",
    });
  }, [welder, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid =
    formData.rootA &&
    formData.rootB &&
    formData.weldNumber;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Welder WPQ</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Weld Number *
            </label>
            <input
              type="text"
              value={formData.weldNumber}
              onChange={(e) => updateField("weldNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., W-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Root A *
            </label>
            <input
              type="text"
              value={formData.rootA}
              onChange={(e) => updateField("rootA", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Root A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Root B *
            </label>
            <input
              type="text"
              value={formData.rootB}
              onChange={(e) => updateField("rootB", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Root B"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Fill A
            </label>
            <input
              type="text"
              value={formData.fillA}
              onChange={(e) => updateField("fillA", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Fill A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Fill B
            </label>
            <input
              type="text"
              value={formData.fillB}
              onChange={(e) => updateField("fillB", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Fill B"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Cap A
            </label>
            <input
              type="text"
              value={formData.capA}
              onChange={(e) => updateField("capA", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Cap A"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Cap B
            </label>
            <input
              type="text"
              value={formData.capB}
              onChange={(e) => updateField("capB", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Cap B"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
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
