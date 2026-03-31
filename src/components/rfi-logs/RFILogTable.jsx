import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
// import { useAuthStore } from "../../store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const SEARCH_COLUMNS = [
  { value: "rfiNumber", label: "RFI Number" },
  { value: "discipline", label: "Discipline" },
  { value: "itpNumber", label: "ITP Number" },
  { value: "reportNumber", label: "Report Number" },
  { value: "description", label: "Description" },
  { value: "location", label: "Location" },
  { value: "inspectionLevel", label: "Inspection Level" },
  { value: "companyInspectionLevel", label: "Company Inspection Level" },
  { value: "drawingNumber", label: "Drawing Number" },
  { value: "dateOfInspection", label: "Date of Inspection" },
  { value: "qc", label: "QC" },
  { value: "companyQC", label: "Company QC" },
  { value: "pmt", label: "PMT" },
  { value: "status", label: "Status" },
  { value: "inspectionDocument", label: "Inspection Document" },

];
export function RFILogTable({
  rfiLogList = [],
  onGenerateForm,
  onSubmitFinalInspection,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
  search,
  searchBy,
  onSearchChange,
  onSearchByChange
}) {
  // const user = useAuthStore((state) => state.user);

  if (!rfiLogList.length) {
    return <div className="p-4 text-gray-500">No RFI logs found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">

      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border-b border-gray-200 gap-4 bg-gray-50">
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search records..."
            value={search || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={searchBy || "rfiNumber"}
            onChange={(e) => onSearchByChange?.(e.target.value)}
            className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          >
            {SEARCH_COLUMNS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>


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
                    className={`px-2 py-1 text-xs rounded font-medium ${rfiLog.status === "Open"
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
                      {canEdit && (
                        <>
                          <DropdownMenuItem onClick={() => onSubmitFinalInspection?.(rfiLog)}>
                            Submit Final Inspection
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(rfiLog)}>
                            Update Record
                          </DropdownMenuItem>
                        </>)}
                      {canDelete && <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(rfiLog)}
                      >
                        Delete Record
                      </DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center border-t border-gray-200 bg-gray-50 px-4 py-3 gap-2">
        {/* Previous button - left aligned */}
        <div className="flex-1">
          <button
            onClick={onPrevPage}
            disabled={isFetching || !pagination?.prevCursor || page <= 1}
            className="cursor-pointer inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        </div>

        {/* Page indicator - centered */}
        <div className="flex-1 text-center text-xs text-gray-600">
          Page {page}
        </div>

        {/* Next button - right aligned */}
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
