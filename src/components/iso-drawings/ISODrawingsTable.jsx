import { Pencil } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Button } from "@/components/ui/button";

export function ISODrawingsTable({
  drawings = [],
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
              <th className="px-3 py-2 text-left text-xs">Project Code</th>
              <th className="px-3 py-2 text-left text-xs">Drawing No.</th>
              <th className="px-3 py-2 text-left text-xs">Title</th>
              <th className="px-3 py-2 text-left text-xs">Revision</th>
              <th className="px-3 py-2 text-left text-xs">Issued As</th>
              <th className="px-3 py-2 text-left text-xs">Spool No.</th>
              <th className="px-3 py-2 text-left text-xs">File</th>
            </tr>
          </thead>
          <tbody>
            {drawings.map((drawing, index) => {
              return (
                <tr
                  key={drawing.id}
                  onClick={() => {
                    onSelectDrawing && onSelectDrawing(drawing);
                  }}
                  className="border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-50"
                >
                  {user.permissions === "all" && (
                    <td className="px-3 py-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit && onEdit(drawing);
                        }}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </Button>
                    </td>
                  )}
                  <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                  <td className="px-3 py-2">{drawing.projectCode || "-"}</td>
                  <td className="px-3 py-2">{drawing.drawingNumber}</td>
                  <td className="px-3 py-2">{drawing.title || "-"}</td>
                  <td className="px-3 py-2">{drawing.revisionNumber || "-"}</td>
                  <td className="px-3 py-2 text-xs">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {drawing.issuedAs || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-2">{drawing.spoolNumber}</td>
                  <td className="px-3 py-2 text-xs ">
                    {drawing.fileUrl ? (
                      <a
                        href={drawing.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </a>
                    ) : (
                      drawing.fileName || "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
