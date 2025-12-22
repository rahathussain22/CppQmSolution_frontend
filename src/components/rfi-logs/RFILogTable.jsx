import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function RFILogTable({ rfiLogList = [], onEdit, onDelete }) {
  const user = useAuthStore((state) => state.user);

  if (!rfiLogList.length) {
    return <div className="p-4 text-gray-500">No RFI logs found.</div>;
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
              <th className="px-3 py-2 text-left text-xs">CPP RFI No</th>
              <th className="px-3 py-2 text-left text-xs">RFI No</th>
              <th className="px-3 py-2 text-left text-xs">Project Code</th>
              <th className="px-3 py-2 text-left text-xs">Discipline</th>
              <th className="px-3 py-2 text-left text-xs">ITP Number</th>
              <th className="px-3 py-2 text-left text-xs">Report Number</th>
              <th className="px-3 py-2 text-left text-xs">Description</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">
                Inspection Officer
              </th>
              <th className="px-3 py-2 text-left text-xs">Inspection Level</th>
              <th className="px-3 py-2 text-left text-xs">
                Company Insp Level
              </th>
              <th className="px-3 py-2 text-left text-xs">Drawing Number</th>
              <th className="px-3 py-2 text-left text-xs">Inspection Date</th>
              <th className="px-3 py-2 text-left text-xs">Inspection Time</th>
              <th className="px-3 py-2 text-left text-xs">CPP QC</th>
              <th className="px-3 py-2 text-left text-xs">Company QC</th>
              <th className="px-3 py-2 text-left text-xs">PMT</th>
              <th className="px-3 py-2 text-left text-xs">RFI Status</th>
              <th className="px-3 py-2 text-left text-xs">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rfiLogList.map((rfiLog, index) => (
              <tr
                key={rfiLog.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {user.permissions === "all" && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit && onEdit(rfiLog)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(rfiLog)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{rfiLog.cppRFINo}</td>
                <td className="px-3 py-2">{rfiLog.rfiNo}</td>
                <td className="px-3 py-2">{rfiLog.projectCode}</td>
                <td className="px-3 py-2">{rfiLog.descipline}</td>
                <td className="px-3 py-2">{rfiLog.itpNumber}</td>
                <td className="px-3 py-2">{rfiLog.reportNumber}</td>
                <td className="px-3 py-2">{rfiLog.description}</td>
                <td className="px-3 py-2">{rfiLog.location}</td>
                <td className="px-3 py-2">{rfiLog.inspectionOfficerName}</td>
                <td className="px-3 py-2">{rfiLog.inspectionLevel}</td>
                <td className="px-3 py-2">{rfiLog.companyInspectionLevel}</td>
                <td className="px-3 py-2">{rfiLog.drawingNumber}</td>
                <td className="px-3 py-2">
                  {rfiLog.inspectionDate
                    ? new Date(rfiLog.inspectionDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">{rfiLog.inspectionTime}</td>
                <td className="px-3 py-2">{rfiLog.cppQc}</td>
                <td className="px-3 py-2">{rfiLog.companyQc}</td>
                <td className="px-3 py-2">{rfiLog.pmt}</td>
                <td className="px-3 py-2">{rfiLog.rfiStatus}</td>
                <td className="px-3 py-2">{rfiLog.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
