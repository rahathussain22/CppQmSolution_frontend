// src/components/ncr-logs/NCRLogTable.jsx
import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const NCRLogTable = ({ ncrLogList = [], onEdit, onDelete }) => {
  const user = useAuthStore((state) => state.user);

  if (!ncrLogList.length) {
    return <div className="p-4 text-gray-500">No NCR logs found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {user.permissions === "all" && (
                <th className="px-3 py-2 text-left text-xs w-20">Actions</th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">NCR No</th>
              <th className="px-3 py-2 text-left text-xs">Discipline</th>
              <th className="px-3 py-2 text-left text-xs">Doc Ref</th>
              <th className="px-3 py-2 text-left text-xs">Para No</th>
              <th className="px-3 py-2 text-left text-xs">Description</th>
              <th className="px-3 py-2 text-left text-xs">Originator</th>
              <th className="px-3 py-2 text-left text-xs">Date of Issue</th>
              <th className="px-3 py-2 text-left text-xs">Target Date</th>
              <th className="px-3 py-2 text-left text-xs">Completion Date</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {ncrLogList.map((log, index) => (
              <tr
                key={log.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {user.permissions === "all" && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit && onEdit(log)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(log)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{log.ncrNo}</td>
                <td className="px-3 py-2">{log.discipline}</td>
                <td className="px-3 py-2">
                  {log.standardsViolated?.docRef || ""}
                </td>
                <td className="px-3 py-2">
                  {log.standardsViolated?.paraNo || ""}
                </td>
                <td
                  className="px-3 py-2 max-w-xs truncate"
                  title={log.description}
                >
                  {log.description}
                </td>
                <td className="px-3 py-2">{log.originator}</td>
                <td className="px-3 py-2">
                  {log.dateOfIssue
                    ? new Date(log.dateOfIssue).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">{log.completionTargetDate}</td>
                <td className="px-3 py-2">{log.completionDate || "-"}</td>
                <td className="px-3 py-2">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NCRLogTable;
