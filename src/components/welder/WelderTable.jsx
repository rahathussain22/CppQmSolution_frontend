import { Pencil, Trash2, ChevronLeft, ChevronRight, FileText } from "lucide-react";

export function WelderTable({
  welderList = [],
  selectedWelder,
  onEdit,
  onSelectWelder,
  onDelete,
  canEdit,
  canDelete,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
}) {

  if (!welderList.length) {
    return <div className="p-4 text-gray-500">No welder records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-max text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {(canEdit || canDelete) && (
                <th className="px-3 py-2 text-left text-xs w-10"></th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Name of Welder</th>
              <th className="px-3 py-2 text-left text-xs">JCC No.</th>
              <th className="px-3 py-2 text-left text-xs">Symbol</th>
              <th className="px-3 py-2 text-left text-xs">Welder's ID / Passport No.</th>
              <th className="px-3 py-2 text-left text-xs">CPP</th>
              <th className="px-3 py-2 text-left text-xs">ILF / BOC</th>
              <th className="px-3 py-2 text-left text-xs">Date of Test</th>
              <th className="px-3 py-2 text-left text-xs">Welding Process</th>
              <th className="px-3 py-2 text-left text-xs">Material</th>
              <th className="px-3 py-2 text-left text-xs">Thickness Range</th>
              <th className="px-3 py-2 text-left text-xs">Diameter Range</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
              <th className="px-3 py-2 text-left text-xs">Remarks</th>
              <th className="px-3 py-2 text-left text-xs">File</th>
            </tr>
          </thead>
          <tbody>
            {welderList.map((welder, index) => (
              <tr
                key={welder.id}
                onClick={() => onSelectWelder && onSelectWelder(welder)}
                className={`border-b border-gray-300 cursor-pointer transition-colors ${selectedWelder?.id === welder.id
                    ? "bg-red-100"
                    : "hover:bg-gray-50"
                  }`}
              >
                {(canEdit || canDelete) && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(welder);
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
                            onDelete && onDelete(welder);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{welder.name || "-"}</td>
                <td className="px-3 py-2">{welder.jccNumber || "-"}</td>
                <td className="px-3 py-2">{welder.symbol || "-"}</td>
                <td className="px-3 py-2">{welder.welderId || "-"}</td>
                <td className="px-3 py-2">{welder.cpp || "-"}</td>
                <td className="px-3 py-2">{welder.ilfOrBoc || "-"}</td>
                <td className="px-3 py-2">{welder.dateOfTest || "-"}</td>
                <td className="px-3 py-2">{welder.weldingProcess || "-"}</td>
                <td className="px-3 py-2">{welder.material || "-"}</td>
                <td className="px-3 py-2">{welder.thickessRange || "-"}</td>
                <td className="px-3 py-2">{welder.diameterRange || "-"}</td>
                <td className="px-3 py-2">{welder.location || "-"}</td>
                <td className="px-3 py-2">
                  {welder.status ? (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${welder.status.toLowerCase() === "qualified"
                          ? "bg-green-100 text-green-700"
                          : welder.status.toLowerCase() === "expired"
                            ? "bg-red-100 text-red-700"
                            : welder.status.toLowerCase() === "suspended"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {welder.status}
                    </span>
                  ) : "-"}
                </td>
                <td className="px-3 py-2">{welder.remarks || "-"}</td>
                <td className="px-3 py-2">
                  {welder.fileUrl ? (
                    <a
                      href={welder.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    >
                      <FileText size={14} />
                      View
                    </a>
                  ) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center border-t border-gray-200 bg-gray-50 px-4 py-3 gap-2">
        <div className="flex-1">
          <button
            onClick={onPrevPage}
            disabled={isFetching || !pagination?.hasPrevPage || page <= 1}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        </div>

        <div className="flex-1 text-center text-xs text-gray-600">
          Page {page}
        </div>

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