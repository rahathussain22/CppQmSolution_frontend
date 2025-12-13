import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWeldJointComponents } from "../../api/joints";
import { useQuery } from "@tanstack/react-query";

function ComponentsSection({ joint }) {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    component: null,
  });

  const {
    data: components = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["components", joint?.id],
    queryFn: () => getWeldJointComponents({ weldJointId: joint?.id }),
    select: (data) => (data && data.weldJointsComponents) || [],
    refetchOnWindowFocus: false,
    enabled: !!joint?.id,
  });

  const openDeleteDialog = (component) =>
    setDeleteDialog({ open: true, component });

  const handleDeleteConfirm = () => {
    console.log("Delete component", deleteDialog.component);
    setDeleteDialog({ open: false, component: null });
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-700">Attached Components</p>
        <Button
          className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
          onClick={() => alert("Add component form can go here")}
        >
          <Plus size={16} /> <span>Add Component</span>
        </Button>
      </div>

      {isLoading && (
        <div className="p-4 text-gray-600">Loading Weld Joint Components...</div>
      )}
      {error && (
        <div className="p-4 text-red-700">Error loading components</div>
      )}

      {components.length > 0 ? (
        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Component Code</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Material</th>
                <th className="px-4 py-2 text-left">Diameter</th>
                <th className="px-4 py-2 text-left">Length</th>
                <th className="px-4 py-2 text-left">Thickness</th>
                <th className="px-4 py-2 text-left">Pipe #</th>
                <th className="px-4 py-2 text-left">Heat #</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {components.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{c.attachedComponent.componentCode}</td>
                  <td className="px-4 py-2">{c.attachedComponent.componentType}</td>
                  <td className="px-4 py-2">{c.attachedComponent.material}</td>
                  <td className="px-4 py-2">{c.attachedComponent.diameter}</td>
                  <td className="px-4 py-2">{c.attachedComponent.length}</td>
                  <td className="px-4 py-2">{c.attachedComponent.thickness}</td>
                  <td className="px-4 py-2">{c.attachedComponent.pipeNumber}</td>
                  <td className="px-4 py-2">{c.attachedComponent.heatNumber}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <Button
                      className="text-gray-700 hover:text-gray-900 p-1"
                      onClick={() => alert("Edit component form can go here")}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      className="text-red-600 hover:text-red-800 p-1"
                      onClick={() => openDeleteDialog(c)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p className="text-sm text-gray-500 mt-2">No components found.</p>
      )}

      {/* Delete confirmation */}
      {deleteDialog.open && (
        <div className="mt-2 p-2 border border-red-300 bg-red-50 rounded">
          <p>
            Delete component{" "}
            <span className="font-semibold">
              {deleteDialog.component.attachedComponent.componentCode}
            </span>{" "}
            ?
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => setDeleteDialog({ open: false, component: null })}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentsSection;
