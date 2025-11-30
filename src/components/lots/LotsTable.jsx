import { Pencil, Trash2 } from "lucide-react";

const statusColors = {
  "not-started": "text-gray-600 bg-gray-100",
  active: "text-green-700 bg-green-100",
  "substantially-complete": "text-blue-700 bg-blue-100",
  complete: "text-purple-700 bg-purple-100",
  "on-hold": "text-orange-700 bg-orange-100",
};

const statusLabels = {
  "not-started": "Not Started",
  active: "Active",
  "substantially-complete": "Substantially Complete",
  complete: "Complete",
  "on-hold": "On Hold",
};

export function LotsTable({ lots, onEditRow, onDeleteRow, isDeleting }) {
  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              <th className="px-3 py-2 text-left text-xs w-[40px]"></th>
              <th className="px-3 py-2 text-left text-xs w-[40px]"></th>
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Project Code</th>
              <th className="px-3 py-2 text-left text-xs">Lot Code</th>
              <th className="px-3 py-2 text-left text-xs">Name</th>
              <th className="px-3 py-2 text-left text-xs">Description</th>
              <th className="px-3 py-2 text-left text-xs">Start Date</th>
              <th className="px-3 py-2 text-left text-xs">Cutoff Date</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {lots.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-3 py-6 text-center text-gray-500"
                >
                  No lots found.
                </td>
              </tr>
            ) : (
              lots.map((lot, index) => (
                <tr key={lot.id} className="border-b border-gray-300">
                  <td className="px-3 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRow(lot);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRow(lot);
                      }}
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                  <td className="px-3 py-2">{lot.projectCode}</td>
                  <td className="px-3 py-2">{lot.lotCode}</td>
                  <td className="px-3 py-2">{lot.name}</td>
                  <td className="px-3 py-2">{lot.description}</td>
                  <td className="px-3 py-2">
                    {lot.startDate
                      ? new Date(lot.startDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-3 py-2">
                    {lot.cuttOffDate
                      ? new Date(lot.cuttOffDate).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        statusColors[lot.status]
                      }`}
                    >
                      {statusLabels[lot.status]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
