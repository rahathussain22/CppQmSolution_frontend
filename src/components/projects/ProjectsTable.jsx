import { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { LotForm } from "../lots/LotsForm";

function ProjectsList({ projects, onEditRow, onDeleteRow, isDeleting, pipelines }) {
  const user = useAuthStore((state) => state.user);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showAddPipelineForm, setShowAddPipelineForm] = useState(null); // track project ID
  const [editingPipeline, setEditingPipeline] = useState(null); // store pipeline for edit

  const handleEditPipeline = (pipeline) => {
    setEditingPipeline(pipeline); // set pipeline being edited
    setShowAddPipelineForm(pipeline.projectId); // open the form for that project
  };

  const handlePipelineSave = (pipelineData) => {
    console.log("Pipeline saved:", pipelineData);
    setEditingPipeline(null);
    setShowAddPipelineForm(null); // close form after save
  };

  const handlePipelineCancel = () => {
    setEditingPipeline(null);
    setShowAddPipelineForm(null);
  };


  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id);
  };

  const handleAddPipelineClick = (projectId) => {
    setShowAddPipelineForm(showAddPipelineForm === projectId ? null : projectId);
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
        <div className="text-center text-gray-500 py-10">No projects found.</div>
      ) : (
        projects.map((project, index) => {
          const isOpen = openProjectId === project.id;
          const isFormOpen = showAddPipelineForm === project.id;

          // Filter pipelines for this project
          const projectPipelines = pipelines?.filter((p) => p.projectId === project.id);

          return (
            <div key={project.id} className="bg-white border border-gray-300 rounded-xl shadow-sm">
              {/* PROJECT HEADER */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex items-center text-sm text-gray-500 w-full">
                  <div className="w-8 font-semibold text-gray-700">{index + 1}</div>
                  <div className="flex-1 font-semibold text-gray-700">{project.name}</div>
                  <div className="flex-1">{project.projectCode}</div>
                  <div className="flex-1">{project.clientName}</div>
                </div>

                {/* Actions */}
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
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {isOpen && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  {/* Project Details */}
                  <p className="font-semibold mb-2 text-gray-700">Project Details</p>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                    <p>
                      <strong>Location:</strong> {project.location}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {project.startDate && new Date(project.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Cutoff Date:</strong>{" "}
                      {project.cuttOffDate && new Date(project.cuttOffDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Pipelines List */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-700">Pipelines</p>

                      <button
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 cursor-pointer flex items-center gap-1"
                        onClick={() => handleAddPipelineClick(project.id)}
                      >
                        <Plus size={16} />
                        <span>Add Pipeline</span>
                      </button>
                    </div>

                    {isFormOpen && (
                      <LotForm
                        lot={editingPipeline}       // Pass the pipeline data if editing
                        isEditing={true}
                        onSave={handlePipelineSave}
                        onCancel={handlePipelineCancel}
                      />
                    )}

                    {projectPipelines?.length > 0 ? (
                      <ul className="pl-4 space-y-2 text-sm text-gray-600">
                        {projectPipelines.map((pipe) => (
                          <li
                            key={pipe.id}
                            className="flex items-center justify-between p-2 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <a className="font-medium hover:font-bold cursor-pointer">{pipe.lineNumber}</a>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                onClick={() => handleEditPipeline(pipe)}
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                className="text-red-600 hover:text-red-800 cursor-pointer"
                                onClick={() => onDeletePipeline(pipe)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </li>
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
