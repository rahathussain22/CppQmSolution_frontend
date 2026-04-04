import { useState, useEffect } from "react";
import { Upload, File, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WPSForm({
  wps,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    wpsNumber: "",
    designCode: "",
    wpsAndWeldersQualCode: "",
    pqrNumber: "",
    material: "",
    diameterRange: "",
    thicknessRange: "",
    process: "",
    fillerRoot: "",
    fillerHot: "",
    fillerFillCap: "",
    fillerUpDown: "",
    weldJointType: "",
    hardness: "",
    impact: "",
    pwht: "",
    ilfStatus: "",
    bocStatus: "",
    remarks: "",
    wpsType: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState(wps?.wpsType || "");

  useEffect(() => {
    setFormData({
      wpsNumber: wps?.wpsNumber || "",
      designCode: wps?.designCode || "",
      wpsAndWeldersQualCode: wps?.wpsAndWeldersQualCode || "",
      pqrNumber: wps?.pqrNumber || "",
      material: wps?.material || "",
      diameterRange: wps?.diameterRange || "",
      thicknessRange: wps?.thicknessRange || "",
      process: wps?.process || "",
      fillerRoot: wps?.fillerRoot || "",
      fillerHot: wps?.fillerHot || "",
      fillerFillCap: wps?.fillerFillCap || "",
      fillerUpDown: wps?.fillerUpDown || "",
      weldJointType: wps?.weldJointType || "",
      hardness: wps?.hardness || "",
      impact: wps?.impact || "",
      pwht: wps?.pwht || "",
      ilfStatus: wps?.ilfStatus || "",
      bocStatus: wps?.bocStatus || "",
      remarks: wps?.remarks || "",
      wpsType: wps?.wpsType || selectedType || "",
    });

    setSelectedFile(null);
  }, [wps, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "pdf") {
        setSelectedFile(file);
      } else {
        alert("Only PDF allowed");
        e.target.value = "";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, file: selectedFile });
  };

  const isValid = formData.wpsNumber && formData.wpsType;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2">
        <h2>WPS</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3">

          {/* Basic */}
          <Input col={3} label="WPS Number *" value={formData.wpsNumber} onChange={(v) => updateField("wpsNumber", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label="Design Code" value={formData.designCode} onChange={(v) => updateField("designCode", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label="PQR No" value={formData.pqrNumber} onChange={(v) => updateField("pqrNumber", v)} disabled={!isEditing || isSaving} />
          <Select
            col={3}
            label="Type *"
            value={formData.wpsType}
            onChange={(v) => updateField("wpsType", v)}
            disabled={!isEditing || isSaving}
            options={[
              { value: "STRUCTURAL", label: "STRUCTURAL (AWS D1.1)" },
              { value: "API", label: "API (Pipeline - API 1104)" },
              { value: "ASME", label: "ASME (ASME IX)" },
            ]}
            setSelectedType={setSelectedType}
          />

          <Input col={4} label="WPS & Welders' Qual Code" value={formData.wpsAndWeldersQualCode} onChange={(v) => updateField("wpsAndWeldersQualCode", v)} disabled={!isEditing || isSaving} />
          <Input col={2} label="Material" value={formData.material} onChange={(v) => updateField("material", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label="Diameter Range" value={formData.diameterRange} onChange={(v) => updateField("diameterRange", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label="Thickness Range" value={formData.thicknessRange} onChange={(v) => updateField("thicknessRange", v)} disabled={!isEditing || isSaving} />

          <Input col={3} label="Process" value={formData.process} onChange={(v) => updateField("process", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label={selectedType === "STRUCTURAL" ? "Root" : "Root/Hot"} value={formData.fillerRoot} onChange={(v) => updateField("fillerRoot", v)} disabled={!isEditing || isSaving} />
          <Input col={3} label={selectedType === "STRUCTURAL" ? "Hot" : "Fill/Cap"} value={selectedType === "STRUCTURAL" ? formData.fillerHot : formData.fillerFillCap} onChange={(v) => {
            selectedType === "STRUCTURAL" ? updateField("fillerHot", v) :
              updateField("fillerFillCap", v)
          }} disabled={!isEditing || isSaving} />
          <Input col={3} label={selectedType === "STRUCTURAL" ? "Fill/Cap" : "Up/Down"} value={selectedType === "STRUCTURAL" ? formData.fillerFillCap : formData.fillerUpDown} onChange={(v) => {
            selectedType === "STRUCTURAL" ? updateField("fillerFillCap", v) :
              updateField("fillerUpDown", v)
          }} disabled={!isEditing || isSaving} />

          <Input col={3} label="Weld Joint Type" value={formData.weldJointType} onChange={(v) => updateField("weldJointType", v)} disabled={!isEditing || isSaving} />
          <Input col={2} label="Hardness" value={formData.hardness} onChange={(v) => updateField("hardness", v)} disabled={!isEditing || isSaving} />
          <Input col={2} label="Impact" value={formData.impact} onChange={(v) => updateField("impact", v)} disabled={!isEditing || isSaving} />
          <Input col={2} label="PWHT" value={formData.pwht} onChange={(v) => updateField("pwht", v)} disabled={!isEditing || isSaving} />
          <Input col={1} label="ILF" value={formData.ilfStatus} onChange={(v) => updateField("ilfStatus", v)} disabled={!isEditing || isSaving} />
          <Input col={1} label="BOC" value={formData.bocStatus} onChange={(v) => updateField("bocStatus", v)} disabled={!isEditing || isSaving} />

          <div className="col-span-12">
            <label className="text-xs"> {selectedType === "STRUCTURAL" ? "Basic Uses" : "Remarks"}</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              disabled={!isEditing || isSaving}
              className="w-full border border-gray-400 px-2 py-1 text-sm"
            />
          </div>

          {/* File */}
          <div className="col-span-12">
            <label className={`inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer ${(!isEditing || isSaving) ? "opacity-50 pointer-events-none" : ""}`}>
              <FileIcon className="h-4 w-4" />
              {selectedFile ? selectedFile.name : "Choose PDF File"}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={!isEditing || isSaving}
                className="hidden"
              />
            </label>

            {selectedFile && (
              <span className="ml-2 text-sm text-gray-600">{selectedFile.name}</span>
            )}
          </div>

        </div>

        <div className="flex gap-2 mt-4">
          <Button disabled={!isValid || isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button type="button" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

/* Reusable components so you don’t repeat yourself like a beginner */

const Input = ({ col, label, value, onChange, disabled }) => (
  <div className={`col-span-${col}`}>
    <label className="text-xs">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full border border-gray-400 px-2 py-1 text-sm"
    />
  </div>
);

const Select = ({ col, label, value, onChange, options, disabled, setSelectedType }) => (
  <div className={`col-span-${col}`}>
    <label className="text-xs">{label}</label>
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        setSelectedType && setSelectedType(e.target.value);
      }}
      disabled={disabled}
      className="w-full border border-gray-400 px-2 py-1 text-sm"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);