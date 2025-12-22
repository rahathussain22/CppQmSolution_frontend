// src/components/ncr-logs/NCRLogForm.jsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const NCRLogForm = ({
  ncrLog,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    ncrNo: ncrLog?.ncrNo || "",
    discipline: ncrLog?.discipline || "",
    standardsViolated: {
      docRef: ncrLog?.standardsViolated?.docRef || "",
      paraNo: ncrLog?.standardsViolated?.paraNo || "",
    },
    description: ncrLog?.description || "",
    originator: ncrLog?.originator || "",
    dateOfIssue: ncrLog?.dateOfIssue || "",
    completionTargetDate: ncrLog?.completionTargetDate || "",
    revisedTargetDate: ncrLog?.revisedTargetDate || "",
    completionDate: ncrLog?.completionDate || "",
    actionTaken: ncrLog?.actionTaken || "",
    status: ncrLog?.status || "Open",
  });

  useEffect(() => {
    setFormData({
      ncrNo: ncrLog?.ncrNo || "",
      discipline: ncrLog?.discipline || "",
      standardsViolated: {
        docRef: ncrLog?.standardsViolated?.docRef || "",
        paraNo: ncrLog?.standardsViolated?.paraNo || "",
      },
      description: ncrLog?.description || "",
      originator: ncrLog?.originator || "",
      dateOfIssue: ncrLog?.dateOfIssue || "",
      completionTargetDate: ncrLog?.completionTargetDate || "",
      revisedTargetDate: ncrLog?.revisedTargetDate || "",
      completionDate: ncrLog?.completionDate || "",
      actionTaken: ncrLog?.actionTaken || "",
      status: ncrLog?.status || "Open",
    });
  }, [ncrLog, isEditing]);

  const updateField = (field, value) => {
    if (field === "docRef" || field === "paraNo") {
      setFormData((prev) => ({
        ...prev,
        standardsViolated: {
          ...prev.standardsViolated,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isValid =
    formData.ncrNo &&
    formData.discipline &&
    formData.description &&
    formData.originator &&
    formData.dateOfIssue &&
    formData.completionTargetDate &&
    formData.status;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">NCR Logs</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">NCR No *</label>
            <input
              type="text"
              value={formData.ncrNo}
              onChange={(e) => updateField("ncrNo", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., NCR-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Discipline *
            </label>
            <select
              value={formData.discipline}
              onChange={(e) => updateField("discipline", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">Select Discipline</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Piping">Piping</option>
              <option value="Instrumentation">Instrumentation</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Doc Ref</label>
            <input
              type="text"
              value={formData.standardsViolated.docRef}
              onChange={(e) => updateField("docRef", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., ASTM A36"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Para No</label>
            <input
              type="text"
              value={formData.standardsViolated.paraNo}
              onChange={(e) => updateField("paraNo", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 3.2.1"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Description of the NCR"
              rows={3}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Originator *
            </label>
            <input
              type="text"
              value={formData.originator}
              onChange={(e) => updateField("originator", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Originator name"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Date of Issue *
            </label>
            <input
              type="date"
              value={formData.dateOfIssue}
              onChange={(e) => updateField("dateOfIssue", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Completion Target Date *
            </label>
            <input
              type="date"
              value={formData.completionTargetDate}
              onChange={(e) =>
                updateField("completionTargetDate", e.target.value)
              }
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Revised Target Date
            </label>
            <input
              type="date"
              value={formData.revisedTargetDate}
              onChange={(e) => updateField("revisedTargetDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Completion Date
            </label>
            <input
              type="date"
              value={formData.completionDate}
              onChange={(e) => updateField("completionDate", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">
              Action Taken
            </label>
            <textarea
              value={formData.actionTaken}
              onChange={(e) => updateField("actionTaken", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Actions taken to resolve the NCR"
              rows={3}
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
};

export default NCRLogForm;
