import { Pencil, Trash2 } from "lucide-react";

export function ProjectsTable({
  projects,
  onEditRow,
  onDeleteRow,
  isDeleting,
}) {
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
              <th className="px-3 py-2 text-left text-xs">Name</th>
              <th className="px-3 py-2 text-left text-xs">Client Name</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">Start Date</th>
              <th className="px-3 py-2 text-left text-xs">Cutoff Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="border-b border-gray-300">
                <td className="px-3 py-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditRow(project);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteRow(project);
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2">{project.projectCode}</td>
                <td className="px-3 py-2">{project.name}</td>
                <td className="px-3 py-2">{project.clientName}</td>
                <td className="px-3 py-2">{project.location}</td>
                <td className="px-3 py-2">
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-3 py-2">
                  {project.cuttOffDate
                    ? new Date(project.cuttOffDate).toLocaleDateString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
