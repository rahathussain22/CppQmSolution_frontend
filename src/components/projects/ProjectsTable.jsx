import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import PipelineSection from "./PipelineSection";
import { Button } from "@/components/ui/button";

function ProjectsList({
  projects,
  onEditRow,
  onDeleteRow,
  isDeleting,
  pipelines,
}) {
  const user = useAuthStore((state) => state.user);
  const [openProjectId, setOpenProjectId] = useState(null);

  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id);
  };

  if (!projects.length) {
    return <div className="p-4 text-gray-500">No projects found.</div>;
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
              <th className="px-3 py-2 text-left text-xs">Project Name</th>
              <th className="px-3 py-2 text-left text-xs">Code</th>
              <th className="px-3 py-2 text-left text-xs">Company</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">Start Date</th>
              <th className="px-3 py-2 text-left text-xs">Cutoff Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              const isOpen = openProjectId === project.id;
              return (
                <>
                  <tr
                    key={project.id}
                    onClick={() => toggleProject(project.id)}
                    className={`border-b border-gray-300 cursor-pointer transition-colors ${
                      isOpen ? "bg-red-100" : "hover:bg-gray-50"
                    }`}
                  >
                    {user.permissions === "all" && (
                      <td className="px-3 py-2">
                        <div className="flex gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditRow(project);
                            }}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteRow(project);
                            }}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-3 py-2 font-semibold">{project.name}</td>
                    <td className="px-3 py-2">{project.projectCode}</td>
                    <td className="px-3 py-2">{project.clientName}</td>
                    <td className="px-3 py-2">{project.location}</td>
                    <td className="px-3 py-2">
                      {project.startDate
                        ? new Date(project.startDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-3 py-2">
                      {project.cuttOffDate
                        ? new Date(project.cuttOffDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-gray-300">
                      <td
                        colSpan={user.permissions === "all" ? 8 : 7}
                        className="p-4 bg-gray-50"
                      >
                        <PipelineSection
                          project={project}
                          pipelines={pipelines}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsList;
