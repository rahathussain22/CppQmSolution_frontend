import { Pencil, Trash2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../store/authStore";

const statusColors = {
  draft: "text-gray-600 bg-gray-100",
  pending: "text-blue-700 bg-blue-100",
  approved: "text-green-700 bg-green-100",
  rejected: "text-red-700 bg-red-100",
  revision: "text-orange-700 bg-orange-100",
};
const statusLabels = {
  draft: "Draft",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  revision: "Revision",
};

export function ISODrawingsTable({
  drawings = [],
  selectedDrawing,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onSendRevision,
  onSelectDrawing,
  isDeleting = false,
}) {
  const user = useAuthStore((state) => state.user);

  if (!drawings.length) {
    return <div className="p-4 text-gray-500">No ISO drawings found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {user.permissions === "all" && (
                <>
                  <th className="px-3 py-2 text-left text-xs w-10"></th>
                  <th className="px-3 py-2 text-left text-xs w-10"></th>
                </>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Drawing Number</th>
              <th className="px-3 py-2 text-left text-xs">Sheet</th>
              <th className="px-3 py-2 text-left text-xs">Title</th>
              <th className="px-3 py-2 text-left text-xs">Issue Date</th>
              <th className="px-3 py-2 text-left text-xs">Rev</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
              <th className="px-3 py-2 text-left text-xs">File</th>
              <th className="px-3 py-2 text-left text-xs">Remarks</th>
              <th className="px-3 py-2 text-left text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drawings.map((drawing, index) => (
              <tr
                key={drawing.id}
                onClick={() => onSelectDrawing && onSelectDrawing(drawing)}
                className={`border-b border-gray-300 cursor-pointer transition-colors ${
                  selectedDrawing?.id === drawing.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {user.permissions === "all" && (
                  <>
                    <td className="px-3 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(drawing);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete && onDelete(drawing);
                        }}
                        className="text-red-600 hover:text-red-800"
                        disabled={isDeleting}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{drawing.drawingNumber}</td>
                <td className="px-3 py-2">{drawing.sheetNumber}</td>
                <td className="px-3 py-2">{drawing.drawingTitle}</td>
                <td className="px-3 py-2">
                  {drawing.issueDate
                    ? new Date(drawing.issueDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-3 py-2">
                  {drawing.revisionCount > 0
                    ? `Rev-${drawing.revisionCount}`
                    : "-"}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      statusColors[drawing.approvalStatus.toLowerCase()]
                    }`}
                  >
                    {statusLabels[drawing.approvalStatus.toLowerCase()]}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs">{drawing.fileName || "-"}</td>
                <td className="px-3 py-2 text-xs text-gray-600">
                  {drawing.remarks || "-"}
                </td>
                <td className="px-3 py-2 flex gap-2">
                  {user?.permissions === "all" &&
                    (drawing.approvalStatus === "Pending" ||
                      drawing.approvalStatus === "revision") && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprove && onApprove(drawing);
                          }}
                          className="text-green-600 hover:text-green-800"
                          title="Approve"
                          disabled={drawing.approvalStatus !== "Pending"}
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onReject && onReject(drawing);
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                          disabled={drawing.approvalStatus !== "Pending"}
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    )}
                  {drawing.approvalStatus === "rejected" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSendRevision && onSendRevision(drawing);
                      }}
                      className="text-orange-600 hover:text-orange-800"
                      title="Send Revision"
                      disabled={drawing.approvalStatus !== "rejected"}
                    >
                      <RefreshCw size={20} />
                    </button>
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
