// src/components/tq-logs/TQLogTable.jsx
import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const TQLogTable = ({ tqLogList = [], onEdit, onDelete }) => {
  const user = useAuthStore((state) => state.user);

  if (!tqLogList.length) {
    return <div className="p-4 text-gray-500">No TQ logs found.</div>;
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-orange-100 text-orange-800",
      Critical: "bg-red-100 text-red-800",
    };
    return `px-2 py-1 text-xs rounded ${
      colors[priority] || "bg-gray-100 text-gray-800"
    }`;
  };

  const getStatusBadge = (status) => {
    const colors = {
      Open: "bg-blue-100 text-blue-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Pending Review": "bg-purple-100 text-purple-800",
      Closed: "bg-green-100 text-green-800",
    };
    return `px-2 py-1 text-xs rounded ${
      colors[status] || "bg-gray-100 text-gray-800"
    }`;
  };

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
              <th className="px-3 py-2 text-left text-xs">Query No</th>
              <th className="px-3 py-2 text-left text-xs">Discipline</th>
              <th className="px-3 py-2 text-left text-xs">Subject</th>
              <th className="px-3 py-2 text-left text-xs">Priority</th>
              <th className="px-3 py-2 text-left text-xs">Originator</th>
              <th className="px-3 py-2 text-left text-xs">Date Raised</th>
              <th className="px-3 py-2 text-left text-xs">Assigned To</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
              <th className="px-3 py-2 text-left text-xs">Date Responded</th>
            </tr>
          </thead>
          <tbody>
            {tqLogList.map((log, index) => (
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
                <td className="px-3 py-2">{log.queryNo}</td>
                <td className="px-3 py-2">{log.discipline}</td>
                <td className="px-3 py-2 max-w-xs truncate" title={log.subject}>
                  {log.subject}
                </td>
                <td className="px-3 py-2">
                  <span className={getPriorityBadge(log.priority)}>
                    {log.priority}
                  </span>
                </td>
                <td className="px-3 py-2">{log.originator}</td>
                <td className="px-3 py-2">
                  {log.dateRaised
                    ? new Date(log.dateRaised).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">{log.assignedTo || "-"}</td>
                <td className="px-3 py-2">
                  <span className={getStatusBadge(log.status)}>
                    {log.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {log.dateResponded
                    ? new Date(log.dateResponded).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TQLogTable;
