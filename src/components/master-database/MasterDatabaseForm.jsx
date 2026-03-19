import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getISODrawings } from "../../api/iso-drawings";
import { getRFILogs } from "../../api/rfiLogs";
import { getWPS } from "../../api/wps";

const LINE_NUMBER_OPTIONS = ["Lot A", "Lot B", "Lot C", "Lot D"];
const JOINT_TYPES = ["Butt", "Skt", "Seal", "Fil."];
const COMPONENT_TYPES = ["Pipe", "Flg", "Elb.", "Tee", "Wolet", "Solet", "Red.", "Nip.", "Vlv."];
const MATERIAL_TYPES = ["X60", "X65", "X70", "GrB"];

function SearchableDropdown({
  label,
  placeholder,
  value,
  onSearch,
  onSelect,
  onClear,
  displayKey,
  secondaryDisplayKey,
  disabled = false,
}) {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!searchTerm.trim()) {
        setOptions([]);
        return;
      }
      if (searchTerm === value && value !== "") {
        return;
      }
      setIsSearching(true);
      try {
        const results = await onSearch(searchTerm);
        setOptions(results || []);
      } catch (error) {
        console.error("Error fetching searchable options:", error);
        setOptions([]);
      } finally {
        setIsSearching(false);
      }
    };
    const debounceTimer = setTimeout(fetchOptions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, value, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (!value) {
          setSearchTerm("");
        } else {
          setSearchTerm(value);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onClear();
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option[displayKey]);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
        autoComplete="off"
      />
      {isOpen && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
          {isSearching ? (
            <div className="px-3 py-2 text-xs text-gray-500">Searching...</div>
          ) : options.length > 0 ? (
            <ul>
              {options.map((opt, idx) => (
                <li
                  key={opt.id || opt._id || idx}
                  onClick={() => handleSelectOption(opt)}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 flex justify-between"
                >
                  <span className="font-medium">{opt[displayKey]}</span>
                  {secondaryDisplayKey && opt[secondaryDisplayKey] && (
                    <span className="text-xs text-gray-500">Rev: {opt[secondaryDisplayKey]}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-xs text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export function MasterDatabaseForm({
  masterData,
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    // 1. Pipeline Details
    lineNumber: masterData?.pipeline?.lineNumber || "",
    location: masterData?.pipeline?.location || "",
    lineSize: masterData?.pipeline?.lineSize || "",
    lineClass: masterData?.pipeline?.lineClass || "",

    // 2. Drawing Details
    drawingNumber: masterData?.drawingDetail?.drawingNumber || "",
    isoDrawingId: masterData?.drawingDetail?.id || "",
    spoolNumber: masterData?.drawingDetail?.spoolNumber || "",

    // 3. Weld Joint Details
    weldNumber: masterData?.weldJointDetail?.weldNumber || "",
    jointType: masterData?.weldJointDetail?.jointType || "",
    initialProduction: masterData?.weldJointDetail?.initialProduction || "",

    // 4. Fit-up Information
    fitupDate: masterData?.fitupDate || "", // Wait, fitupDate isn't in original nested structure? The user didn't specify exactly where it is in the GET response, I'll put it flat.
    fitupRFI: masterData?.fitupRFI || "",
    fitupRfiId: masterData?.fitupRfiId || "",

    // 5. Welding Information
    weldingDate: masterData?.weldingDate || "",
    weldingRFI: masterData?.weldingRFI || "",
    weldingRfiId: masterData?.weldingRfiId || "",

    // 6. Component 1 Information
    comp1Type: masterData?.component1Info?.name || "",
    comp1Material: masterData?.component1Info?.material || "",
    comp1Diameter: masterData?.component1Info?.diameter || "",
    comp1Thickness: masterData?.component1Info?.thickness || "",
    comp1Length: masterData?.component1Info?.length || "",
    comp1PipeNo: masterData?.component1Info?.pipeNumber || "",
    comp1HeatNo: masterData?.component1Info?.heatNumber || "",

    // 7. Component 2 Information
    comp2Type: masterData?.component2Info?.name || "",
    comp2Material: masterData?.component2Info?.material || "",
    comp2Diameter: masterData?.component2Info?.diameter || "",
    comp2Thickness: masterData?.component2Info?.thickness || "",
    comp2Length: masterData?.component2Info?.length || "",
    comp2PipeNo: masterData?.component2Info?.pipeNumber || "",
    comp2HeatNo: masterData?.component2Info?.heatNumber || "",

    // 8. Welding Procedure
    wpsNumber: masterData?.weldingProcedure?.wpsNumber || "",
    weldProcess: masterData?.weldingProcedure?.weldProcess || "",

    // 9. Welder Details (Pipeline/Piping)
    rootA: masterData?.welderDetail?.rootA || "",
    rootB: masterData?.welderDetail?.rootB || "",
    fillA: masterData?.welderDetail?.fillA || "",
    fillB: masterData?.welderDetail?.fillB || "",
    capA: masterData?.welderDetail?.capA || "",
    capB: masterData?.welderDetail?.capB || "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrawingSearch = async (term) => {
    const response = await getISODrawings({ search: term, searchBy: "drawingNumber", limit: 5 });
    return response?.data?.isoDrawings || response?.isoDrawings || [];
  };

  const handleRfiSearch = async (term) => {
    const response = await getRFILogs({ search: term, searchBy: "rfiNumber", limit: 5 });
    return response?.data?.rfis || response?.rfis || [];
  };

  const handleWpsSearch = async (term) => {
    const response = await getWPS({ search: term, searchBy: "wpsNumber", limit: 5 });
    return response?.data?.wps || response?.wps || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSave(formData);
    }
  };

  const isValid = formData.lineNumber && formData.drawingNumber;

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold">
          {isEditing ? "Edit Master Database Record" : "Create Master Database Record"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* SECTION 1: Pipeline Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            1. Pipeline Details
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Line Number *</label>
              <select
                value={formData.lineNumber}
                onChange={(e) => updateField("lineNumber", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select Line Number</option>
                {LINE_NUMBER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., Zone 4"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Line Size</label>
              <input
                type="text"
                value={formData.lineSize}
                onChange={(e) => updateField("lineSize", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., 200mm"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Line Class</label>
              <input
                type="text"
                value={formData.lineClass}
                onChange={(e) => updateField("lineClass", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., Class A"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Drawing Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            2. Drawing Details
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <SearchableDropdown
                label="Drawing No. *"
                placeholder="Search Drawing Number..."
                value={formData.drawingNumber}
                onSearch={handleDrawingSearch}
                displayKey="drawingNumber"
                secondaryDisplayKey="revision"
                onSelect={(drawing) => {
                  updateField("drawingNumber", drawing.drawingNumber);
                  updateField("isoDrawingId", drawing.id || drawing._id);
                }}
                onClear={() => {
                  updateField("drawingNumber", "");
                  updateField("isoDrawingId", "");
                }}
                disabled={isSaving}
              />
            </div>
            <div className="col-span-6">
              <label className="block text-xs text-gray-700 mb-1">Spool Number</label>
              <input
                type="text"
                value={formData.spoolNumber}
                onChange={(e) => updateField("spoolNumber", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., SP-001"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Weld Joint Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            3. Weld Joint Details
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Weld Number</label>
              <input
                type="text"
                value={formData.weldNumber}
                onChange={(e) => updateField("weldNumber", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., SW-001"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Joint Type</label>
              <select
                value={formData.jointType}
                onChange={(e) => updateField("jointType", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select Joint Type</option>
                {JOINT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Initial Production</label>
              <input
                type="text"
                value={formData.initialProduction}
                onChange={(e) => updateField("initialProduction", e.target.value)}
                disabled={isSaving}
                placeholder="e.g., IP2"
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Fit-up Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            4. Fit-up Information
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <label className="block text-xs text-gray-700 mb-1">Fit-up Date</label>
              <input
                type="date"
                value={formData.fitupDate}
                onChange={(e) => updateField("fitupDate", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-6">
              <SearchableDropdown
                label="Fit-up RFI"
                placeholder="Search Fit-up RFI Number..."
                value={formData.fitupRFI}
                onSearch={handleRfiSearch}
                displayKey="rfiNumber"
                onSelect={(rfi) => {
                  updateField("fitupRFI", rfi.rfiNumber);
                  updateField("fitupRfiId", rfi.id || rfi._id);
                }}
                onClear={() => {
                  updateField("fitupRFI", "");
                  updateField("fitupRfiId", "");
                }}
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Welding Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            5. Welding Information
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <label className="block text-xs text-gray-700 mb-1">Welding Date</label>
              <input
                type="date"
                value={formData.weldingDate}
                onChange={(e) => updateField("weldingDate", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-6">
              <SearchableDropdown
                label="Welding RFI"
                placeholder="Search Welding RFI Number..."
                value={formData.weldingRFI}
                onSearch={handleRfiSearch}
                displayKey="rfiNumber"
                onSelect={(rfi) => {
                  updateField("weldingRFI", rfi.rfiNumber);
                  updateField("weldingRfiId", rfi.id || rfi._id);
                }}
                onClear={() => {
                  updateField("weldingRFI", "");
                  updateField("weldingRfiId", "");
                }}
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: Component 1 Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            6. Component 1 Information
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Component 1</label>
              <select
                value={formData.comp1Type}
                onChange={(e) => updateField("comp1Type", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {COMPONENT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Material 1</label>
              <select
                value={formData.comp1Material}
                onChange={(e) => updateField("comp1Material", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {MATERIAL_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Diameter 1</label>
              <input
                type="text"
                value={formData.comp1Diameter}
                onChange={(e) => updateField("comp1Diameter", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Thickness 1</label>
              <input
                type="text"
                value={formData.comp1Thickness}
                onChange={(e) => updateField("comp1Thickness", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Length 1</label>
              <input
                type="text"
                value={formData.comp1Length}
                onChange={(e) => updateField("comp1Length", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Pipe No. 1</label>
              <input
                type="text"
                value={formData.comp1PipeNo}
                onChange={(e) => updateField("comp1PipeNo", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Heat No. 1</label>
              <input
                type="text"
                value={formData.comp1HeatNo}
                onChange={(e) => updateField("comp1HeatNo", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 7: Component 2 Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            7. Component 2 Information
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Component 2</label>
              <select
                value={formData.comp2Type}
                onChange={(e) => updateField("comp2Type", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {COMPONENT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Material 2</label>
              <select
                value={formData.comp2Material}
                onChange={(e) => updateField("comp2Material", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              >
                <option value="">Select</option>
                {MATERIAL_TYPES.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Diameter 2</label>
              <input
                type="text"
                value={formData.comp2Diameter}
                onChange={(e) => updateField("comp2Diameter", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">Thickness 2</label>
              <input
                type="text"
                value={formData.comp2Thickness}
                onChange={(e) => updateField("comp2Thickness", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Length 2</label>
              <input
                type="text"
                value={formData.comp2Length}
                onChange={(e) => updateField("comp2Length", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Pipe No. 2</label>
              <input
                type="text"
                value={formData.comp2PipeNo}
                onChange={(e) => updateField("comp2PipeNo", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-xs text-gray-700 mb-1">Heat No. 2</label>
              <input
                type="text"
                value={formData.comp2HeatNo}
                onChange={(e) => updateField("comp2HeatNo", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 8: Welding Procedure */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            8. Welding Procedure
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              <SearchableDropdown
                label="WPS Number"
                placeholder="Search WPS Number..."
                value={formData.wpsNumber}
                onSearch={handleWpsSearch}
                displayKey="wpsNumber"
                onSelect={(wps) => {
                  updateField("wpsNumber", wps.wpsNumber);
                  if (wps.weldProcess) {
                    updateField("weldProcess", wps.weldProcess);
                  }
                }}
                onClear={() => {
                  updateField("wpsNumber", "");
                }}
                disabled={isSaving}
              />
            </div>
            <div className="col-span-6">
              <label className="block text-xs text-gray-700 mb-1">Weld Process</label>
              <input
                type="text"
                value={formData.weldProcess}
                onChange={(e) => updateField("weldProcess", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* SECTION 9: Welder Details (Pipeline/Piping) */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            9. Welder Details (Pipeline/Piping)
          </h3>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Root A</label>
              <input
                type="text"
                value={formData.rootA}
                onChange={(e) => updateField("rootA", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Root B</label>
              <input
                type="text"
                value={formData.rootB}
                onChange={(e) => updateField("rootB", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Fill A</label>
              <input
                type="text"
                value={formData.fillA}
                onChange={(e) => updateField("fillA", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Fill B</label>
              <input
                type="text"
                value={formData.fillB}
                onChange={(e) => updateField("fillB", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Cap A</label>
              <input
                type="text"
                value={formData.capA}
                onChange={(e) => updateField("capA", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-700 mb-1">Cap B</label>
              <input
                type="text"
                value={formData.capB}
                onChange={(e) => updateField("capB", e.target.value)}
                disabled={isSaving}
                className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-gray-300">
          <Button
            type="submit"
            className="cursor-pointer px-4 py-1 text-sm bg-gray-800 text-white border border-gray-700 rounded hover:bg-black"
            disabled={isSaving || !isValid}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
