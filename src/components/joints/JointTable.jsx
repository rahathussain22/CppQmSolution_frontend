import { Pencil, Trash2 } from "lucide-react";

export function JointTable({
  joints = [],
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) {

  if (!joints.length) {
    return <div className="p-4 text-gray-500">No weld joints found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {(canEdit || canDelete) && (
                <th className="px-4 py-2 text-left text-xs">&nbsp;</th>
              )}
              <th className="px-4 py-2 text-left text-xs">#</th>
              <th className="px-4 py-2 text-left text-xs">Weld Number</th>
              <th className="px-4 py-2 text-left text-xs">Pipeline</th>
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
                <td className="px-4 py-2">{joint.pipelineLineNumber || "-"}</td>
                <td className="px-4 py-2">{joint.jointType || "-"}</td>
                <td className="px-4 py-2">{joint.initialProduction || "-"}</td>
                <td className="px-4 py-2">
                  {joint.component1?.componentCode || "-"}
                </td>
                <td className="px-4 py-2">
                  {joint.component2?.componentCode || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
