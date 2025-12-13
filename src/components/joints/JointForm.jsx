import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/project";
import { getPipelines } from "../../api/pipelines";
import { Button } from "@/components/ui/button";
import { getWPS } from "../../api/wps";
export function WeldJointForm({ joint, isEditing, isSaving = false, onSave, onCancel }) {
    const user = useAuthStore((state) => state.user);

    const [formData, setFormData] = useState({
        projectId: joint?.projectId || 0,
        pipelineId: joint?.pipelineId || 0,
        pipelineName: joint?.name || "",
        pipelineLotCode: joint?.lotCode || "",
        isoDrawingId: joint?.isoDrawingId || 0,
        spoolId: joint?.spoolId || 0,
        weldNumber: joint?.weldNumber || "",
        sequenceNumber: joint?.sequenceNumber || "",
        weldType: joint?.weldType || "",
        weldLocation: joint?.weldLocation || "",
        initialProduction: joint?.initialProduction || "",
        jointConfiguration: joint?.jointConfiguration || "",
        wpsId: joint?.wpsId || 0,
        weldingProcess: joint?.weldingProcess || "",
        preHeatTempRequired: joint?.preHeatTempRequired || "",
        pwhtRequired: joint?.pwhtRequired || false,
        ndtPercentage: joint?.ndtPercentage || "",
        weldStatus: joint?.weldStatus || "planned",
        finalAcceptanceDate: joint?.finalAcceptanceDate || "",
        isTracer: joint?.isTracer || false,
        tracerType: joint?.tracerType || "",
        tracerWeldLocation: joint?.tracerWeldLocation || "",
        remarks: joint?.remarks || "",
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const {
        data: availableProjects = [],
        isLoading: isLoadingProjects,
        error: errorProjects,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects({ createdBy: user.id }),
        select: (data) => data?.projects || [],
        refetchOnWindowFocus: false,
    });

    const {
        data: availablePipelines = [],
        isLoading: isLoadingPipelines,
        error: errorPipelines,
    } = useQuery({
        queryKey: ["pipelines", formData.projectId],
        queryFn: () => getPipelines({ projectId: formData.projectId }),
        select: (data) => data?.pipelines || [],
        enabled: !!formData.projectId,
        refetchOnWindowFocus: false,
    });

    const {
        data: availableWPS = [],
        isLoading: isLoadingWPS,
        error: errorWPS,
    } = useQuery({
        queryKey: ["wps", formData.projectId],
        queryFn: () => getWPS({ projectId: formData.projectId }),
        select: (data) => data?.wps || [],
        enabled: !!formData.projectId,
        refetchOnWindowFocus: false,
    });

    // useEffect(()=>{
    //     if(availablePipelines){
    //         console.log("Available pipelines")
    //         console.log(availablePipelines)
    //     }
    // },[availablePipelines])

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
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Project *</label>
                        <select
                            value={formData.projectId}
                            onChange={(e) => updateField("projectId", Number(e.target.value))}
                            disabled={!isEditing || isLoadingProjects || errorProjects}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        >
                            <option value={0}>Select Project</option>
                            {availableProjects.map((p) => (
                                <option key={p.id} value={p.id}>{p.projectCode} - {p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Pipeline *</label>
                        <select
                            value={formData.pipelineId}
                            onChange={(e) => updateField("pipelineId", Number(e.target.value))}
                            disabled={!isEditing || !formData.projectId || isLoadingPipelines || errorPipelines}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        >
                            <option value={0}>Select Pipeline</option>
                            {availablePipelines.map((pl) => (
                                <option key={pl.id} value={pl.id}>
                                    {pl.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Weld Number *</label>
                        <input
                            type="text"
                            value={formData.weldNumber}
                            onChange={(e) => updateField("weldNumber", e.target.value)}
                            disabled={!isEditing || isSaving}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Sequence Number</label>
                        <input
                            type="number"
                            value={formData.sequenceNumber}
                            onChange={(e) => updateField("sequenceNumber", Number(e.target.value))}
                            disabled={!isEditing || isSaving}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Weld Type</label>
                        <input
                            type="text"
                            value={formData.weldType}
                            onChange={(e) => updateField("weldType", e.target.value)}
                            disabled={!isEditing || isSaving}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Weld Location</label>
                        <input
                            type="text"
                            value={formData.weldLocation}
                            onChange={(e) => updateField("weldLocation", e.target.value)}
                            disabled={!isEditing || isSaving}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">WPS *</label>
                        <select
                            value={formData.wpsId}
                            onChange={(e) => updateField("wpsId", Number(e.target.value))}
                            disabled={!isEditing || !formData.wpsId || isLoadingWPS || errorWPS}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        >
                            <option value={0}>Select WPS</option>
                            {availableWPS.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {w.wpsNumber}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xs text-gray-700 mb-1">Pre-Heat Temp Required</label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.preHeatTempRequired}
                            onChange={(e) => updateField("preHeatTempRequired", Number(e.target.value))}
                            disabled={!isEditing || isSaving}
                            className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
                        />
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" className="px-4 py-1 text-sm bg-red-600 text-white border border-red-700 rounded hover:bg-red-700" disabled={!isEditing || isSaving}>Save</Button>
                    <Button type="button" onClick={onCancel} className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50" disabled={isSaving}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
