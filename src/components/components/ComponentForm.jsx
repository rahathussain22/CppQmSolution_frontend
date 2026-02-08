import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { Button } from "@/components/ui/button";

export function ComponentForm({
  component,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    projectId: component?.projectId || 0,
    componentCode: component?.componentCode || "",
    name: component?.name || "",
    componentType: component?.componentType || "",
    material: component?.material || "",
    diameter: component?.diameter || "",
    length: component?.length || "",
    thickness: component?.thickness || "",
    pipeNumber: component?.pipeNumber || "",
    heatNumber: component?.heatNumber || "",
  });

  const {
    data: availableProjects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ createdBy: user.id }),
    select: (data) => (data && data.projects) || [],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFormData({
      projectId: component?.projectId || 0,
      componentCode: component?.componentCode || "",
      name: component?.name || "",
      componentType: component?.componentType || "",
      material: component?.material || "",
      diameter: component?.diameter || "",
      length: component?.length || "",
      thickness: component?.thickness || "",
      pipeNumber: component?.pipeNumber || "",
      heatNumber: component?.heatNumber || "",
    });
  }, [component, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid =
    formData.projectId &&
    formData.componentCode &&
    formData.name &&
    formData.componentType &&
    formData.material &&
    formData.diameter &&
    formData.length &&
    formData.thickness &&
    formData.pipeNumber &&
    formData.heatNumber;

  return (
    <div className="bg-linear-to-b from-red-50 to-red-100 border-2 border-red-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-red-600 to-red-700 text-white px-3 py-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2">Components</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Project *
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => updateField("projectId", Number(e.target.value))}
              disabled={!isEditing || isLoadingProjects || errorProjects}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {errorProjects ? (
                <option>Error loading projects</option>
              ) : (
                <option value={0}>Select Project</option>
              )}
              {availableProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectCode} - {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Component Code *
            </label>
            <input
              type="text"
              value={formData.componentCode}
              onChange={(e) => updateField("componentCode", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., COMP-001"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., Main Pipe"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Component Type *
            </label>
            <select
              value={formData.componentType}
              onChange={(e) => updateField("componentType", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">-- Select Component --</option>
              <option value="Pipe">Pipe</option>
              <option value="Flg">Flg</option>
              <option value="Elb.">Elb.</option>
              <option value="Tee">Tee</option>
              <option value="Wolet">Wolet</option>
              <option value="Solet">Solet</option>
              <option value="Red.">Red.</option>
              <option value="Nip.">Nip.</option>
              <option value="Vlv.">Vlv.</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Material *
            </label>
            <select
              value={formData.material}
              onChange={(e) => updateField("material", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              <option value="">-- Select Material --</option>
              <option value="X60">X60</option>
              <option value="X65">X65</option>
              <option value="X70">X70</option>
              <option value="GrB">GrB</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Diameter *
            </label>
            <input
              type="text"
              value={formData.diameter}
              onChange={(e) => updateField("diameter", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 10mm"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">Length *</label>
            <input
              type="text"
              value={formData.length}
              onChange={(e) => updateField("length", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 100cm"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Thickness *
            </label>
            <input
              type="text"
              value={formData.thickness}
              onChange={(e) => updateField("thickness", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., 2mm"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Pipe Number *
            </label>
            <input
              type="text"
              value={formData.pipeNumber}
              onChange={(e) => updateField("pipeNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., P-123"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Heat Number *
            </label>
            <input
              type="text"
              value={formData.heatNumber}
              onChange={(e) => updateField("heatNumber", e.target.value)}
              disabled={!isEditing || isSaving}
              placeholder="e.g., H-456"
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
