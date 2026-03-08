import { Pencil, Trash2 } from "lucide-react";

export function WelderTable({
  welderList = [],
  selectedWelder,
  onEdit,
  onSelectWelder,
  onDelete,
  canEdit,
  canDelete,
}) {

  if (!welderList.length) {
    return <div className="p-4 text-gray-500">No welder records found.</div>;
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
              <th className="px-3 py-2 text-left text-xs">Weld Number</th>
              <th className="px-3 py-2 text-left text-xs">Root A</th>
              <th className="px-3 py-2 text-left text-xs">Root B</th>
              <th className="px-3 py-2 text-left text-xs">Fill A</th>
              <th className="px-3 py-2 text-left text-xs">Fill B</th>
              <th className="px-3 py-2 text-left text-xs">Cap A</th>
              <th className="px-3 py-2 text-left text-xs">Cap B</th>
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
                      {canEdit && <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(welder);
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>}
                      {canDelete && <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(welder);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>}
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{welder.weldNumber}</td>
                <td className="px-3 py-2">{welder.rootA}</td>
                <td className="px-3 py-2">{welder.rootB}</td>
                <td className="px-3 py-2">{welder.fillA || "-"}</td>
                <td className="px-3 py-2">{welder.fillB || "-"}</td>
                <td className="px-3 py-2">{welder.capA || "-"}</td>
                <td className="px-3 py-2">{welder.capB || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
