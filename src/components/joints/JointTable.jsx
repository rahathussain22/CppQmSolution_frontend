import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export function JointTable({
  joints = [],
  onEdit,
  onDelete,
  canEdit,
  canDelete,
  pagination,
  onNextPage,
  onPrevPage,
  page,
  isFetching,
}) {

  if (!joints.length) {
    return <div className="p-4 text-gray-500">No weld joints found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {(canEdit || canDelete) && (
                <th className="px-4 py-2 text-left text-xs">&nbsp;</th>
              )}
              <th className="px-4 py-2 text-left text-xs">#</th>
              <th className="px-4 py-2 text-left text-xs">Weld Number</th>
              <th className="px-4 py-2 text-left text-xs">WPS No.</th>
              <th className="px-4 py-2 text-left text-xs">Drawing No.</th>
              <th className="px-4 py-2 text-left text-xs">Joint Type</th>
              <th className="px-4 py-2 text-left text-xs">Initial Production</th>
              <th className="px-4 py-2 text-left text-xs">Component 1</th>
              <th className="px-4 py-2 text-left text-xs">Component 2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {joints.map((joint, index) => (
              <tr key={joint.id} className="hover:bg-gray-50">
                {(canEdit || canDelete) && (
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {canEdit && <button
                        onClick={() => onEdit && onEdit(joint)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>}
                      {canDelete && <button
                        onClick={() => onDelete && onDelete(joint)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>}
                    </div>
                  </td>
                )}
                <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                <td className="px-4 py-2">{joint.weldNumber}</td>
                <td className="px-4 py-2">{joint.wpsNumber || "-"}</td>
                <td className="px-4 py-2">{joint.drawingNumber || "-"}</td>
                <td className="px-4 py-2">{joint.jointType || "-"}</td>
                <td className="px-4 py-2">{joint.initialProduction || "-"}</td>
                <td className="px-4 py-2">
                  {(Array.isArray(joint.components) && joint.components[0]) || "-"}
                </td>
                <td className="px-4 py-2">
                  {(Array.isArray(joint.components) && joint.components[1]) || "-"}
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
