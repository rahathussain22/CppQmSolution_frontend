import { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import PipelineSection from "./PipelineSection";

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

  return (
    <div className="space-y-3">
      {/* Table Header */}
      <div className="hidden md:flex bg-gray-200 border border-gray-300 rounded-t-lg p-4 text-sm text-gray-700 font-semibold">
        <div className="w-8">#</div>
        <div className="flex-1">Project Name</div>
        <div className="flex-1 ml-4">Code</div>
        <div className="flex-1 ml-2">Company</div>
        <div className="w-32 text-right">Actions</div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No projects found.
        </div>
      ) : (
        projects.map((project, index) => {
          const isOpen = openProjectId === project.id;

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
                <div className="flex items-center text-sm text-gray-500 w-full">
                  <div className="w-8 font-semibold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-1 font-semibold text-gray-700">
                    {project.name}
                  </div>
                  <div className="flex-1">{project.projectCode}</div>
                  <div className="flex-1">{project.clientName}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {user.permissions === "all" && (
                    <>
                      <button
                        className="text-gray-700 hover:text-gray-900"
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
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {isOpen && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  {/* Project Details */}
                  <p className="font-semibold mb-2 text-gray-700">
                    Project Details
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                    <p>
                      <strong>Location:</strong> {project.location}
                    </p>
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

                  {/* Pipelines Section */}
                  <PipelineSection project={project} pipelines={pipelines} />
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
