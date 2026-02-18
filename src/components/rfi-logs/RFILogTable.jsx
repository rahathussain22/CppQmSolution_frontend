import { MoreVertical } from "lucide-react";
// import { useAuthStore } from "../../store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RFILogTable({
  rfiLogList = [],
  onGenerateForm,
  onSubmitFinalInspection,
  onEdit,
  onDelete,
}) {
  // const user = useAuthStore((state) => state.user);

  if (!rfiLogList.length) {
    return <div className="p-4 text-gray-500">No RFI logs found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-max text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">RFI Number</th>
              <th className="px-3 py-2 text-left text-xs">Discipline</th>
              <th className="px-3 py-2 text-left text-xs">ITP Number</th>
              <th className="px-3 py-2 text-left text-xs">Report Number</th>
              <th className="px-3 py-2 text-left text-xs">Description</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">Inspection Level</th>
              <th className="px-3 py-2 text-left text-xs">Company Inspection Level</th>
              <th className="px-3 py-2 text-left text-xs">Drawing Number</th>
              <th className="px-3 py-2 text-left text-xs">Date of Inspection</th>
              <th className="px-3 py-2 text-left text-xs">QC</th>
              <th className="px-3 py-2 text-left text-xs">Company QC</th>
              <th className="px-3 py-2 text-left text-xs">PMT</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
              <th className="px-3 py-2 text-left text-xs">Inspection Document</th>
              <th className="px-3 py-2 text-center text-xs w-12"></th>
            </tr>
          </thead>
          <tbody>
            {rfiLogList.map((rfiLog, index) => (
              <tr
                key={rfiLog.id}
                className="border-b border-gray-300 hover:bg-gray-50 relative"
              >
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 font-medium">{rfiLog.rfiNumber}</td>
                <td className="px-3 py-2">{rfiLog.discipline}</td>
                <td className="px-3 py-2">{rfiLog.itpNumber}</td>
                <td className="px-3 py-2">{rfiLog.reportNumber}</td>
                <td className="px-3 py-2 max-w-xs truncate">
                  {rfiLog.description || "-"}
                </td>
                <td className="px-3 py-2">{rfiLog.location || "-"}</td>
                <td className="px-3 py-2">{rfiLog.inspectionLevel}</td>
                <td className="px-3 py-2">{rfiLog.companyInspectionLevel}</td>
                <td className="px-3 py-2">{rfiLog.drawingNumber || "-"}</td>
                <td className="px-3 py-2">
                  {rfiLog.dateOfInspection
                    ? new Date(rfiLog.dateOfInspection).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2">{rfiLog.qc}</td>
                <td className="px-3 py-2">{rfiLog.companyQC || "-"}</td>
                <td className="px-3 py-2">{rfiLog.pmt}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      rfiLog.status === "Open"
                        ? "bg-blue-100 text-blue-800"
                        : rfiLog.status === "Accepted & Closed"
                          ? "bg-green-100 text-green-800"
                          : rfiLog.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {rfiLog.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {rfiLog.files && rfiLog.files.length > 0 ? (
                    <a
                      href={rfiLog.files[rfiLog.files.length - 1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                    >
                      📄 View Document
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center relative">
                  <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                      <DropdownMenuItem onClick={() => onGenerateForm?.(rfiLog)}>
                        Generate Form
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSubmitFinalInspection?.(rfiLog)}>
                        Submit Final Inspection
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(rfiLog)}>
                        Update Record
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(rfiLog)}
                      >
                        Delete Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
