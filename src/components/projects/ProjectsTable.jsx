import { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Plus } from "lucide-react";
function ProjectsList({ projects, onEditRow, onDeleteRow, isDeleting, pipelines }) {
  const user = useAuthStore((state) => state.user);
  const [openProjectId, setOpenProjectId] = useState(null);

  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No projects found.
        </div>
      ) : (
        projects.map((project, index) => {
          const isOpen = openProjectId === project.id;

          // ✅ Filter pipelines for this project
          const projectPipelines = pipelines?.filter(
            (p) => p.projectId === project.id
          );

          return (
            <div
              key={project.id}
              className="bg-white border border-gray-300 rounded-xl shadow-sm"
            >
              {/* PROJECT HEADER */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleProject(project.id)}
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    {index + 1}. {project.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {project.projectCode} • {project.clientName}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {user.permissions === "all" && (
                    <>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditRow(project);
                        }}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRow(project);
                        }}
                        disabled={isDeleting}
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}

                  {isOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {isOpen && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  {/* Project Details */}
                  <p className="font-semibold mb-2 text-gray-700">Project Details</p>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                    <p><strong>Location:</strong> {project.location}</p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {project.startDate &&
                        new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Cutoff Date:</strong>{" "}
                      {project.cuttOffDate &&
                        new Date(project.cuttOffDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Pipelines List */}
                  <div className="mt-4">
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-semibold text-gray-700 mb-2">Pipelines</p>

                      <button
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={16} />
                        <span>Add Pipeline</span>
                      </button>

                    </div>

                    {projectPipelines?.length > 0 ? (
                      <ul className="pl-4 space-y-1 list-disc text-sm text-gray-600">
                        {projectPipelines.map((pipe) => (
                          <li key={pipe.id} className="cursor-pointer hover:font-bold mt-2">{pipe.lineNumber}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No pipelines found.</p>
                    )}
                  </div>
                </div>
              )}


            </div>
          );
        })
      )}
    </div>
  );
}

export default ProjectsList;
