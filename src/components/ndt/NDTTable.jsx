import { Pencil, Trash2 } from "lucide-react";

export function NDTTable({
  rows = [],
  type, // "RT" | "UT"
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) {
  if (!rows.length) {
    return <div className="p-4 text-gray-500">No requests found.</div>;
  }

  const showActions = canEdit || canDelete;

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {showActions && (
                <th className="px-4 py-2 text-left text-xs">&nbsp;</th>
              )}
              <th className="px-4 py-2 text-left text-xs">#</th>
              <th className="px-4 py-2 text-left text-xs">Weld Number</th>
              <th className="px-4 py-2 text-left text-xs">RFI No.</th>
              <th className="px-4 py-2 text-left text-xs">Request Date</th>
              {type === "UT" && (
                <th className="px-4 py-2 text-left text-xs">UT Type</th>
              )}
              <th className="px-4 py-2 text-left text-xs">First Report</th>
              <th className="px-4 py-2 text-left text-xs">First Result</th>
              <th className="px-4 py-2 text-left text-xs">Tracer 1</th>
              <th className="px-4 py-2 text-left text-xs">Tracer 2</th>
              <th className="px-4 py-2 text-left text-xs">Second Report</th>
              <th className="px-4 py-2 text-left text-xs">Second Result</th>
              <th className="px-4 py-2 text-left text-xs">Third Report</th>
              <th className="px-4 py-2 text-left text-xs">Third Result</th>
              {type === "RT" ? (
                <>
                  <th className="px-4 py-2 text-left text-xs">Film Quality</th>
                  <th className="px-4 py-2 text-left text-xs">Weld Quality</th>
                </>
              ) : (
                <th className="px-4 py-2 text-left text-xs">
                  ILF Agreement
                </th>
              )}
              <th className="px-4 py-2 text-left text-xs">Reviewed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={row.id ?? index} className="hover:bg-gray-50">
                {showActions && (
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={() => onEdit && onEdit(row)}
                          className="text-gray-700 hover:text-gray-900"
                          type="button"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => onDelete && onDelete(row)}
                          className="text-red-600 hover:text-red-800"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
                <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                <td className="px-4 py-2">{row.weldNumber || "-"}</td>
                <td className="px-4 py-2">{row.rfiNumber || "-"}</td>
                <td className="px-4 py-2">{row.requestDate || "-"}</td>
                {type === "UT" && (
                  <td className="px-4 py-2">{row.utType || "-"}</td>
                )}
                <td className="px-4 py-2">{row.firstReport || "-"}</td>
                <td className="px-4 py-2">{row.firstResult || "-"}</td>
                <td className="px-4 py-2">{row.tracer1 || row.Tracer1 || "-"}</td>
                <td className="px-4 py-2">{row.tracer2 || row.Tracer2 || "-"}</td>
                <td className="px-4 py-2">{row.secondReport || "-"}</td>
                <td className="px-4 py-2">{row.secondResult || "-"}</td>
                <td className="px-4 py-2">{row.thirdReport || "-"}</td>
                <td className="px-4 py-2">{row.thirdResult || "-"}</td>
                {type === "RT" ? (
                  <>
                    <td className="px-4 py-2">{row.filmQuality || "-"}</td>
                    <td className="px-4 py-2">{row.weldQuality || "-"}</td>
                  </>
                ) : (
                  <td className="px-4 py-2">
                    {row.ilfAggreement || row.ilfAgreement || "-"}
                  </td>
                )}
                <td className="px-4 py-2">{row.reviewed || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

