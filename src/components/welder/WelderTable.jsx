import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function WelderTable({
  welderList = [],
  selectedWelder,
  onEdit,
  onSelectWelder,
  onDelete,
}) {
  const user = useAuthStore((state) => state.user);

  if (!welderList.length) {
    return <div className="p-4 text-gray-500">No welder records found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {user.permissions === "all" && (
                <th className="px-3 py-2 text-left text-xs w-10"></th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Project</th>
              <th className="px-3 py-2 text-left text-xs">Stamp Number</th>
              <th className="px-3 py-2 text-left text-xs">Name</th>
              <th className="px-3 py-2 text-left text-xs">Employee ID</th>
              <th className="px-3 py-2 text-left text-xs">Company</th>
              <th className="px-3 py-2 text-left text-xs">Nationality</th>
              <th className="px-3 py-2 text-left text-xs">Passport Number</th>
              <th className="px-3 py-2 text-left text-xs">Contact Number</th>
              <th className="px-3 py-2 text-left text-xs">
                Qualification Date
              </th>
              <th className="px-3 py-2 text-left text-xs">Expiry Date</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {welderList.map((welder, index) => (
              <tr
                key={welder.id}
                onClick={() => onSelectWelder && onSelectWelder(welder)}
                className={`border-b border-gray-300 cursor-pointer transition-colors ${
                  selectedWelder?.id === welder.id
                    ? "bg-red-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {user.permissions === "all" && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(welder);
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(welder);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">
                  {welder.projectName ||
                    welder.project?.name ||
                    welder.projectCode ||
                    "-"}
                </td>
                <td className="px-3 py-2">{welder.stampNumber}</td>
                <td className="px-3 py-2">{welder.name}</td>
                <td className="px-3 py-2">{welder.employeeId}</td>
                <td className="px-3 py-2">{welder.company}</td>
                <td className="px-3 py-2">{welder.nationality}</td>
                <td className="px-3 py-2">{welder.passportNumber}</td>
                <td className="px-3 py-2">{welder.contactNumber}</td>
                <td className="px-3 py-2">
                  {welder.qualificationDate
                    ? new Date(welder.qualificationDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">
                  {welder.expiryDate
                    ? new Date(welder.expiryDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">{welder.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
