import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";


const SEARCH_COLUMNS = [
  { value: "lineNumber", label: "Line No." },
  { value: "location", label: "Location" },
  { value: "lineSize", label: "Line Size" },
  { value: "lineClass", label: "Line Class" },
  { value: "drawingNumber", label: "Drawing No." },
  { value: "sheetNumber", label: "Sheet No." },
  { value: "spoolNumber", label: "Spool No." },
  { value: "weldNumber", label: "Weld No." },
  { value: "jointType", label: "Joint Type" },
  { value: "initialProduction", label: "Initial Production" },
  { value: "component1Name", label: "Component 1 Name" },
  { value: "component1Material", label: "Component 1 Material" },
  { value: "component1Diameter", label: "Component 1 Diameter" },
  { value: "component1Thickness", label: "Component 1 Thickness" },
  { value: "component1Length", label: "Component 1 Length" },
  { value: "component1PipeNumber", label: "Component 1 Pipe No." },
  { value: "component1HeatNumber", label: "Component 1 Heat No." },
  { value: "component2Name", label: "Component 2 Name" },
  { value: "component2Material", label: "Component 2 Material" },
  { value: "component2Diameter", label: "Component 2 Diameter" },
  { value: "component2Thickness", label: "Component 2 Thickness" },
  { value: "component2Length", label: "Component 2 Length" },
  { value: "component2PipeNumber", label: "Component 2 Pipe No." },
  { value: "component2HeatNumber", label: "Component 2 Heat No." },
  { value: "wpsNumber", label: "WPS No." },
  { value: "weldProcess", label: "Weld Process" },
  { value: "rootA", label: "Root A" },
  { value: "rootB", label: "Root B" },
  { value: "fillA", label: "Fill A" },
  { value: "fillB", label: "Fill B" },
  { value: "capA", label: "Cap A" },
  { value: "capB", label: "Cap B" },
  { value: "preHeatTemp", label: "Pre-Heat Temp" },
  { value: "weldVisual", label: "Weld Visual" },
  { value: "ndtPercent", label: "NDT %" },
  { value: "rtReqDate", label: "RT Req Date" },
  { value: "rtRfiNumber", label: "RT RFI No." },
  { value: "rtFirstReportNumber", label: "1st RT Rep." },
  { value: "rtFirstResult", label: "1st RT Res." },
  { value: "rtTracer1", label: "RT Tracer 1" },
  { value: "rtTracer2", label: "RT Tracer 2" },
  { value: "rtSecondReportNumber", label: "2nd RT Rep." },
  { value: "rtSecondResult", label: "2nd RT Res." },
  { value: "rtThirdReportNumber", label: "3rd RT Rep." },
  { value: "rtThirdResult", label: "3rd RT Res." },
  { value: "rtFilmQuality", label: "Film Quality" },
  { value: "rtWeldQuality", label: "Weld Quality" },
  { value: "rtPercentReviewed", label: "RT % Reviewed" },
  { value: "utType", label: "UT Type" },
  { value: "utReqDate", label: "UT Req Date" },
  { value: "utRfiNumber", label: "UT RFI No." },
  { value: "utFirstReportNumber", label: "1st UT Rep." },
  { value: "utFirstResult", label: "1st UT Res." },
  { value: "utTracer1", label: "UT Tracer 1" },
  { value: "utTracer2", label: "UT Tracer 2" },
  { value: "utSecondReportNumber", label: "2nd UT Rep." },
  { value: "utSecondResult", label: "2nd UT Res." },
  { value: "utThirdReportNumber", label: "3rd UT Rep." },
  { value: "utThirdResult", label: "3rd UT Res." },
  { value: "utIlfAgreement", label: "ILF Agreement" },
  { value: "utPercentReviewed", label: "UT % Reviewed" },
  { value: "ndeType", label: "NDE Type" },
  { value: "ndeResult", label: "NDE Result" },
  { value: "ndeReportNumber", label: "NDE Report" },
  { value: "pwhtResult", label: "PWHT Result" },
  { value: "pwhtReportNumber", label: "PWHT Report" },
  { value: "girthWeldCoatingType", label: "Girth Welding Coating Type" },
  { value: "holidayReportNumber", label: "Holiday Report#" },
  { value: "loweringRfiNumber", label: "Lowering RFI#" },
  { value: "backfillRfiNumber", label: "Backfill RFI#" },
];

export function MasterDatabaseTable({
  data,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
  search,
  onSearchChange,
  searchBy,
  onSearchByChange,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) {
  if (!data.length) {
    return <div className="p-4 text-gray-500">No records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border-b border-gray-200 gap-4 bg-gray-50">
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search records..."
            value={search || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={searchBy || "weldNumber"}
            onChange={(e) => onSearchByChange?.(e.target.value)}
            className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            {SEARCH_COLUMNS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-max table-auto border-collapse text-xs">
          <thead>
            <tr>
              {(canEdit || canDelete) && (
                <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200 w-20">
                  Actions
                </th>
              )}
              {/* Pipeline Details */}
              <th colSpan="4" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Pipeline Details
              </th>
              {/* Drawing Details */}
              <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Drawing Details
              </th>
              {/* Weld Joint Details */}
              <th colSpan="3" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Weld Joint Details
              </th>
              {/* Component 1 Info */}
              <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Component 1 Info
              </th>
              {/* Component 2 Info */}
              <th colSpan="7" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Component 2 Info
              </th>
              {/* Welding Procedure */}
              <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Welding Procedure
              </th>
              {/* 9. Welder Details */}
              <th colSpan="6" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Welder Details
              </th>
              {/* 10-12. Individual Values */}
              <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Pre-Heat Temp
              </th>
              <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Weld Visual
              </th>
              <th rowSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                NDT %
              </th>
              {/* 13. Radiographic Test */}
              <th colSpan="10" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Radiographic Test
              </th>
              {/* 14. ILF RT Review */}
              <th colSpan="3" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                ILF RT Review
              </th>
              {/* 15. Ultrasonic Test */}
              <th colSpan="11" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Ultrasonic Test
              </th>
              {/* 16. ILF UT Review */}
              <th colSpan="2" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                ILF UT Review
              </th>
              {/* 17. Other NDE */}
              <th colSpan="4" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Other NDE
              </th>
              {/* 18. PWHT */}
              <th colSpan="3" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                PWHT
              </th>
              {/* 19. Other Info */}
              <th colSpan="6" className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Other Info
              </th>
            </tr>
            <tr>
              {/* Pipeline Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Location</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line Size</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Line Class</th>
              {/* Drawing Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Drawing No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Spool No.</th>
              {/* Weld Joint Details columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Weld No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Joint Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Initial Production</th>
              {/* Component 1 Info columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Material</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Diameter</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Thickness</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Length</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Pipe No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Heat No.</th>
              {/* Component 2 Info columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Material</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Diameter</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Thickness</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Length</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Pipe No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Heat No.</th>
              {/* Welding Procedure columns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">WPS No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Weld Process</th>
              {/* Welder Details */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Root A</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Root B</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Fill A</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Fill B</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Cap A</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Cap B</th>
              {/* Radiographic Test */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">RT Req. Date</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">RT RFI No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">1st RT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">1st RT Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">RT Tracer 1</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">RT Tracer 2</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">2nd RT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">2nd RT Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">3rd RT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">3rd RT Res.</th>
              {/* ILF RT Review */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Film Quality</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Weld Quality</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">RT % Rev.</th>
              {/* Ultrasonic Test */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT Req. Date</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT RFI No.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">1st UT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">1st UT Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT Tracer 1</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT Tracer 2</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">2nd UT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">2nd UT Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">3rd UT Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">3rd UT Res.</th>
              {/* ILF UT Review */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">ILF Agr.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">UT % Rev.</th>
              {/* Other NDE */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">NDE Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">NDE Req. Date</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">NDE Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">NDE Rep.</th>
              {/* PWHT */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">PWHT Req. Date</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">PWHT Res.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">PWHT Rep.</th>
              {/* Other Info */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Coating Type</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Coating Date</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Coating RFI</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Holiday Rep.</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Lowering RFI</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Backfill RFI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              return (
                <tr
                  key={row.id ?? row._id ?? idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {(canEdit || canDelete) && (
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="flex justify-center gap-2">
                        {canEdit && (
                          <button
                            onClick={() => onEdit && onEdit(row)}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => onDelete && onDelete(row)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                  {/* Pipeline Details */}
                  <td className="border border-gray-300 px-2 py-2">{row.lineNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.location || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.lineSize || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.lineClass || "-"}</td>

                  {/* Drawing Details */}
                  <td className="border border-gray-300 px-2 py-2">{row.drawingNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.spoolNumber || "-"}</td>

                  {/* Weld Joint Details */}
                  <td className="border border-gray-300 px-2 py-2">{row.weldNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.jointType || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.initialProduction || "-"}</td>

                  {/* Component 1 Info */}
                  <td className="border border-gray-300 px-2 py-2">{row.component1Name || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1Material || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1Diameter || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1Thickness || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1Length || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1PipeNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component1HeatNumber || "-"}</td>

                  {/* Component 2 Info */}
                  <td className="border border-gray-300 px-2 py-2">{row.component2Name || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2Material || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2Diameter || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2Thickness || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2Length || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2PipeNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.component2HeatNumber || "-"}</td>

                  {/* Welding Procedure */}
                  <td className="border border-gray-300 px-2 py-2">{row.wpsNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.weldProcess || "-"}</td>

                  {/* Welder Details */}
                  <td className="border border-gray-300 px-2 py-2">{row.rootA || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rootB || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.fillA || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.fillB || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.capA || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.capB || "-"}</td>

                  {/* Weld Properties */}
                  <td className="border border-gray-300 px-2 py-2">{row.preheatTemp || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.weldVisual || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.ndtPercent || "-"}</td>

                  {/* Radiographic Test */}
                  <td className="border border-gray-300 px-2 py-2">{row.rtRequestDate || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtRFINumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtFirstReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtFirstResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtTracter1 || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtTracter2 || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtSecondReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtSecondResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtThirdReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtThirdResult || "-"}</td>

                  {/* ILF RT Review */}
                  <td className="border border-gray-300 px-2 py-2">{row.rtFilmQuality || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtWeldQuality || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.rtPercentReviewed || "-"}</td>

                  {/* Ultrasonic Test */}
                  <td className="border border-gray-300 px-2 py-2">{row.utType || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utRequestDate || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utRFINumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utFirstReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utFirstResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utTracter1 || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utTracter2 || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utSecondReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utSecondResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utThirdReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utThirdResult || "-"}</td>

                  {/* ILF UT Review */}
                  <td className="border border-gray-300 px-2 py-2">{row.utIlfAgreement || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.utPercentReviewed || "-"}</td>

                  {/* Other NDE */}
                  <td className="border border-gray-300 px-2 py-2">{row.ndeType || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.ndeRequestDate || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.ndeResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.ndeReportNumber || "-"}</td>

                  {/* PWHT */}
                  <td className="border border-gray-300 px-2 py-2">{row.pwhtRequestDate || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.pwhtResult || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.pwhtReportNumber || "-"}</td>

                  {/* Other Info */}
                  <td className="border border-gray-300 px-2 py-2">{row.girthWeldCoatingType || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.coatingDate || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.coatingRFI || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.holidayReportNumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.loweringRFINumber || "-"}</td>
                  <td className="border border-gray-300 px-2 py-2">{row.backfillRFINumber || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center border-t border-gray-200 bg-gray-50 px-4 py-3 gap-2">
        {/* Previous button */}
        <div className="flex-1">
          <button
            onClick={onPrevPage}
            disabled={isFetching || !pagination?.prevCursor || page <= 1}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        </div>

        {/* Page indicator */}
        <div className="flex-1 text-center text-xs text-gray-600">
          Page {page}
        </div>

        {/* Next button */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onNextPage}
            disabled={isFetching || !pagination?.hasNextPage}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
