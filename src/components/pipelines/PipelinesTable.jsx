import { Pencil, Trash2 } from "lucide-react";

export function PipelinesTable({
  pipelines,
  onEdit,
  onDelete,
  isLoading = false,
  error = null,
  isDeleting = false,
}) {
  if (isLoading) {
    return <div className="p-4 text-gray-600">Loading pipelines...</div>;
  }
  if (error) {
    return (
      <div className="p-4 text-red-700">
        Error loading pipelines: {error.message}
      </div>
    );
  }
  if (!pipelines.length) {
    return <div className="p-4 text-gray-500">No pipelines found.</div>;
  }
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
              <th className="px-3 py-2 text-left text-xs">Line Number</th>
              <th className="px-3 py-2 text-left text-xs">Line Size</th>
              <th className="px-3 py-2 text-left text-xs">Line Class</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((pipeline, index) => (
              <tr
                key={pipeline.id}
                className={
                  "border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-50"
                }
              >
                <td className="px-3 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit && onEdit(pipeline);
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
                      onDelete && onDelete(pipeline);
                    }}
                    className="text-red-600 hover:text-red-800"
                    disabled={isDeleting}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{pipeline.projectCode}</td>
                <td className="px-3 py-2">{pipeline.lotCode}</td>
                <td className="px-3 py-2">{pipeline.lineNumber}</td>
                <td className="px-3 py-2">{pipeline.lineSize}</td>
                <td className="px-3 py-2">{pipeline.lineClass}</td>
                <td className="px-3 py-2">{pipeline.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
