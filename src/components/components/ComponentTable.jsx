import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export function ComponentTable({ componentList = [], onEdit, onDelete }) {
  const user = useAuthStore((state) => state.user);

  if (!componentList.length) {
    return <div className="p-4 text-gray-500">No components found.</div>;
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
              <th className="px-3 py-2 text-left text-xs">Project</th>
              <th className="px-3 py-2 text-left text-xs">Component Type</th>
              <th className="px-3 py-2 text-left text-xs">Component Code</th>
              <th className="px-3 py-2 text-left text-xs">Material</th>
              <th className="px-3 py-2 text-left text-xs">Diameter</th>
              <th className="px-3 py-2 text-left text-xs">Length</th>
              <th className="px-3 py-2 text-left text-xs">Thickness</th>
              <th className="px-3 py-2 text-left text-xs">Pipe Number</th>
              <th className="px-3 py-2 text-left text-xs">Heat Number</th>
            </tr>
          </thead>
          <tbody>
            {componentList.map((component, index) => (
              <tr
                key={component.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {user.permissions === "all" && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit && onEdit(component)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(component)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">
                  {component.projectName ||
                    component.project?.name ||
                    component.projectCode ||
                    "-"}
                </td>
                <td className="px-3 py-2">{component.componentType}</td>
                <td className="px-3 py-2">{component.componentCode}</td>
                <td className="px-3 py-2">{component.material}</td>
                <td className="px-3 py-2">{component.diameter}</td>
                <td className="px-3 py-2">{component.length}</td>
                <td className="px-3 py-2">{component.thickness}</td>
                <td className="px-3 py-2">{component.pipeNumber}</td>
                <td className="px-3 py-2">{component.heatNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
