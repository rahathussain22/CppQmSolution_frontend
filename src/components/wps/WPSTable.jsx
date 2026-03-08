import { Pencil, Trash2 } from "lucide-react";

export function WPSTable({
  wpsList = [],
  selectedWPS,
  onEdit,
  onSelectWPS,
  onDelete,
  canEdit,
  canDelete
}) {

  if (!wpsList.length) {
    return <div className="p-4 text-gray-500">No WPS records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {(canEdit || canDelete) && (
                <th className="px-3 py-2 text-left text-xs w-10"></th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Project</th>
              <th className="px-3 py-2 text-left text-xs">WPS Number</th>
              <th className="px-3 py-2 text-left text-xs">Weld Process</th>
              <th className="px-3 py-2 text-left text-xs">File</th>
            </tr>
          </thead>
          <tbody>
            {wpsList.map((wps, index) => (
              <tr
                key={wps.id}
                onClick={() => onSelectWPS && onSelectWPS(wps)}
                className={`border-b border-gray-300 cursor-pointer transition-colors ${selectedWPS?.id === wps.id ? "bg-red-100" : "hover:bg-gray-50"
                  }`}
              >
                {(canEdit || canDelete) && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      {canEdit && <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(wps);
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>}
                      {canDelete && <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(wps);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>}
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">
                  {wps.projectName ||
                    wps.project?.name ||
                    wps.projectCode ||
                    "-"}
                </td>
                <td className="px-3 py-2">{wps.wpsNumber}</td>
                <td className="px-3 py-2">{wps.weldProcess || "-"}</td>
                <td className="px-3 py-2 text-xs">
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
    </div>
  );
}
