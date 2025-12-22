// src/components/tq-logs/TQLogForm.jsx
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const TQLogForm = ({
  tqLog,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    queryNo: tqLog?.queryNo || "",
    discipline: tqLog?.discipline || "",
    subject: tqLog?.subject || "",
    description: tqLog?.description || "",
    originator: tqLog?.originator || "",
    dateRaised: tqLog?.dateRaised || "",
    priority: tqLog?.priority || "Medium",
    assignedTo: tqLog?.assignedTo || "",
    response: tqLog?.response || "",
    dateResponded: tqLog?.dateResponded || "",
    status: tqLog?.status || "Open",
    referenceDocs: tqLog?.referenceDocs || "",
    projectCode: tqLog?.projectCode || "",
  });

  useEffect(() => {
    setFormData({
      queryNo: tqLog?.queryNo || "",
      discipline: tqLog?.discipline || "",
      subject: tqLog?.subject || "",
      description: tqLog?.description || "",
      originator: tqLog?.originator || "",
      dateRaised: tqLog?.dateRaised || "",
      priority: tqLog?.priority || "Medium",
      assignedTo: tqLog?.assignedTo || "",
      response: tqLog?.response || "",
      dateResponded: tqLog?.dateResponded || "",
      status: tqLog?.status || "Open",
      referenceDocs: tqLog?.referenceDocs || "",
      projectCode: tqLog?.projectCode || "",
    });
  }, [tqLog, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid =
    formData.queryNo &&
    formData.discipline &&
    formData.subject &&
    formData.description &&
    formData.originator &&
    formData.dateRaised &&
    formData.priority &&
    formData.status &&
    formData.projectCode;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">TQ Logs</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Query No *
            </label>
            <input
              type="text"
              value={formData.queryNo}
              onChange={(e) => updateField("queryNo", e.target.value)}
              disabled={!isEditing || isSaving || tqLog}
              placeholder="e.g., TQ-001"
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
              <option value="Process">Process</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Priority *
            </label>
            <select
              value={formData.priority}
              onChange={(e) => updateField("priority", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
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
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Brief subject of the technical query"
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
              placeholder="Person raising the query"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Date Raised *
            </label>
            <input
              type="date"
              value={formData.dateRaised}
              onChange={(e) => updateField("dateRaised", e.target.value)}
              disabled={!isEditing || isSaving}
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
              placeholder="Detailed description of the technical query"
              rows={3}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Assigned To
            </label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => updateField("assignedTo", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Person/team assigned to respond"
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
              <option value="Pending Review">Pending Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">Response</label>
            <textarea
              value={formData.response}
              onChange={(e) => updateField("response", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Technical response or resolution"
              rows={3}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Date Responded
            </label>
            <input
              type="date"
              value={formData.dateResponded}
              onChange={(e) => updateField("dateResponded", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Reference Documents
            </label>
            <input
              type="text"
              value={formData.referenceDocs}
              onChange={(e) => updateField("referenceDocs", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="Related documents/references"
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

export default TQLogForm;
