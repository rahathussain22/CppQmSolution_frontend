import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export function WPSTable({
  wpsList = [],
  selectedWPS,
  onEdit,
  onSelectWPS,
  onDelete,
  canEdit,
  canDelete,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
}) {

  if (!wpsList.length) {
    return <div className="p-4 text-gray-500">No WPS records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-max text-sm">

          <thead>
            <tr>
              {(canEdit || canDelete) && (
                <th
                  rowSpan={2}
                  className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200 w-20"
                >
                  Actions
                </th>
              )}

              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">#</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">WPS Number</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Design Code</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">
                WPS & Welders' Qual Code
              </th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">PQR No</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Material</th>

              {/* Size */}
              <th colSpan={2} className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Size
              </th>

              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Process</th>

              {/* Filler / Electrode / Progression */}
              <th colSpan={3} className="border border-gray-400 px-2 py-2 text-center font-bold bg-gray-200">
                Filler / Electrode / Progression
              </th>

              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Weld Joint Type</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Hardness</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Impact</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">PWHT</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">ILF</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">BOC</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">Basic Uses</th>
              <th rowSpan={2} className="border border-gray-400 px-2 py-2 bg-gray-200">File</th>
            </tr>

            <tr>
              {/* Size subcolumns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">
                Diameter Range
              </th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">
                Thickness Range
              </th>

              {/* Filler subcolumns */}
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Root</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Hot</th>
              <th className="border border-gray-400 px-2 py-2 bg-gray-200">Fill/Cap</th>
            </tr>
          </thead>

          <tbody>
            {wpsList.map((wps, index) => (
              <tr
                key={wps.id}
                onClick={() => onSelectWPS && onSelectWPS(wps)}
                className={`cursor-pointer transition-colors ${selectedWPS?.id === wps.id ? "bg-red-100" : "hover:bg-gray-50"
                  }`}
              >
                {(canEdit || canDelete) && (
                  <td className="border border-gray-400 px-2 py-2">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(wps);
                          }}
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(wps);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}

                <td className="border border-gray-400 px-2 py-2 text-gray-600">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-2 py-2">{wps.wpsNumber}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.designCode || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">
                  {wps.wpsAndWeldersQualCode || "-"}
                </td>
                <td className="border border-gray-400 px-2 py-2">{wps.pqrNumber || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.material || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.diameterRange || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.thicknessRange || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.process || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.fillerRoot || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.fillerHot || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">
                  {wps.fillerFillCap || wps.fillerUpDown || "-"}
                </td>
                <td className="border border-gray-400 px-2 py-2">{wps.weldJointType || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.hardness || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.impact || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.pwht || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.ilfStatus || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">{wps.bocStatus || "-"}</td>
                <td className="border border-gray-400 px-2 py-2">
                  {wps.basicUses || wps.remarks || "-"}
                </td>
                <td className="border border-gray-400 px-2 py-2 text-xs">
                  {wps.fileUrl ? (
                    <a
                      href={wps.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    wps.fileName || "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center border-t border-gray-200 bg-gray-50 px-4 py-3 gap-2">
        {/* Previous button - left aligned */}
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

        {/* Page indicator - centered */}
        <div className="flex-1 text-center text-xs text-gray-600">
          Page {page}
        </div>

        {/* Next button - right aligned */}
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
