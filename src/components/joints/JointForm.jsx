import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getComponents } from "../../api/components";
import { getPipelines } from "../../api/pipelines";

export function WeldJointForm({
  joint,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    weldNumber: joint?.weldNumber || "",
    pipelineLineNumber: joint?.pipelineLineNumber || "",
    jointType: joint?.jointType || "",
    initialProduction: joint?.initialProduction || "",
    component1Id: joint?.component1Id || 0,
    component2Id: joint?.component2Id || 0,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setFormData({
      weldNumber: joint?.weldNumber || "",
      pipelineLineNumber: joint?.pipelineLineNumber || "",
      jointType: joint?.jointType || "",
      initialProduction: joint?.initialProduction || "",
      component1Id: joint?.component1Id || 0,
      component2Id: joint?.component2Id || 0,
      pdfFile: joint?.pdfFile || null,
    });
  }, [joint, isEditing]);

  // PDF upload removed — backend will accept JSON without file

  const {
    data: availableComponents = [],
    isLoading: isLoadingComponents,
  } = useQuery({
    queryKey: ["components"],
    queryFn: () => getComponents({}),
    select: (data) => (data && data.data) || [],
    refetchOnWindowFocus: false,
  });

  const {
    data: availablePipelines = [],
    isLoading: isLoadingPipelines,
  } = useQuery({
    queryKey: ["pipelines"],
    queryFn: () => getPipelines({}),
    select: (data) => (data && data.pipelines) || [],
    refetchOnWindowFocus: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold">Weld Joint Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Weld Number *
            </label>
            <input
              type="text"
              placeholder="e.g., SW-001, FW-002"
              value={formData.weldNumber}
              onChange={(e) => updateField("weldNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            />
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Joint Type *
            </label>
            <select
              value={formData.jointType}
              onChange={(e) => updateField("jointType", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            >
              <option value="">Select Joint Type</option>
              <option value="Butt">Butt</option>
              <option value="Skl">Skl</option>
              <option value="Seal">Seal</option>
              <option value="Fil">Fil</option>
            </select>
          </div>
          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Initial Production *
            </label>
            <select
              value={formData.initialProduction}
              onChange={(e) => updateField("initialProduction", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            >
              <option value="">Select Initial Production</option>
              <option value="IP1">IP1</option>
              <option value="IP2">IP2</option>
              <option value="IP3">IP3</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <label className="block text-xs text-gray-700 mb-1">Pipeline *</label>
            <select
              value={formData.pipelineLineNumber}
              onChange={(e) => updateField("pipelineLineNumber", e.target.value)}
              disabled={!isEditing || isSaving || isLoadingPipelines}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              required
            >
              <option value="">Select Pipeline</option>
              {availablePipelines.map((pipeline) => (
                <option key={pipeline.id} value={pipeline.lineNumber}>
                  {pipeline.lineNumber} - {pipeline.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Component 1
            </label>
            <select
              value={formData.component1Id}
              onChange={(e) => updateField("component1Id", Number(e.target.value))}
              disabled={!isEditing || isSaving || isLoadingComponents}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value={0}>Select Component 1</option>
              {availableComponents.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.componentCode} - {comp.componentType} - {comp.material}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Component 2
            </label>
            <select
              value={formData.component2Id}
              onChange={(e) => updateField("component2Id", Number(e.target.value))}
              disabled={!isEditing || isSaving || isLoadingComponents}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value={0}>Select Component 2</option>
              {availableComponents.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.componentCode} - {comp.componentType} - {comp.material}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PDF upload removed — sending JSON payload only */}

        <div className="space-x-2">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700"
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
