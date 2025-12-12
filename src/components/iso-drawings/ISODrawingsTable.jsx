import { Pencil } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function ISODrawingsTable({
  drawings = [],
  selectedDrawing,
  onEdit,
  onSelectDrawing,
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
                <th className="px-3 py-2 text-left text-xs w-10">&nbsp;</th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Project</th>
              <th className="px-3 py-2 text-left text-xs">Drawing Number</th>
              <th className="px-3 py-2 text-left text-xs">Sheet</th>
              <th className="px-3 py-2 text-left text-xs">Title</th>
              <th className="px-3 py-2 text-left text-xs">Issue Date</th>
              <th className="px-3 py-2 text-left text-xs">Revision</th>
              <th className="px-3 py-2 text-left text-xs">Approved By</th>
              <th className="px-3 py-2 text-left text-xs">Approved Date</th>
              <th className="px-3 py-2 text-left text-xs">File</th>
            </tr>
          </thead>
          <tbody>
            {drawings.map((drawing, index) => (
              <tr
                key={drawing.id}
                onClick={() => onSelectDrawing && onSelectDrawing(drawing)}
                className={`border-b border-gray-300 cursor-pointer transition-colors ${
                  selectedDrawing?.id === drawing.id
                    ? "bg-red-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {user.permissions === "all" && (
                  <td className="px-3 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit && onEdit(drawing);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">
                  {drawing.projectName ||
                    drawing.project?.name ||
                    drawing.projectCode ||
                    "-"}
                </td>
                <td className="px-3 py-2">{drawing.drawingNumber}</td>
                <td className="px-3 py-2">{drawing.sheetNumber}</td>
                <td className="px-3 py-2">{drawing.drawingTitle}</td>
                <td className="px-3 py-2">
                  {drawing.issueDate
                    ? new Date(drawing.issueDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-3 py-2">
                  {drawing.revision != null
                    ? String(drawing.revision)
                    : drawing.revisionCount != null
                    ? String(drawing.revisionCount)
                    : "-"}
                </td>
                <td className="px-3 py-2">{drawing.approvedBy || "-"}</td>
                <td className="px-3 py-2">
                  {drawing.approvedDate
                    ? new Date(drawing.approvedDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2 text-xs">
                  {drawing.fileUrl ? (
                    <a
                      href={drawing.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    drawing.fileName || "-"
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
