import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWeldJointComponents } from "@/api/joints";
import { getComponents } from "@/api/components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAttachWeldJointComponentsMutation,
  useDetachWeldJointComponentsMutation,
} from "../../hooks/useWeldJoints";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function ComponentsSection({ joint }) {
  const queryClient = useQueryClient();
  const [detachDialog, setDetachDialog] = useState({
    open: false,
    component: null,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const attachMutation = useAttachWeldJointComponentsMutation();
  const detachMutation = useDetachWeldJointComponentsMutation();

  const { data: availableComponents = [], isLoading: isLoadingAvailable } =
    useQuery({
      queryKey: ["components", joint?.projectId],
      queryFn: () => getComponents({ projectId: joint?.projectId }),
      select: (data) => (data && data.data) || [],
      refetchOnWindowFocus: false,
      enabled: !!joint?.projectId && showAddForm,
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

  const attachedComponentIds = components.map((c) => c.componentId);

  const filteredAvailableComponents = availableComponents.filter(
    (comp) => !attachedComponentIds.includes(comp.id)
  );

  const handleDetachConfirm = () => {
    detachMutation.mutate(
      {
        weldJointId: joint.id,
        componentId: detachDialog.component.componentId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["components", joint?.id],
          });
          setDetachDialog({ open: false, component: null });
          toast.success("Component detached successfully.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to detach component.");
        },
      }
    );
  };

  const openDetachDialog = (component) => {
    setDetachDialog({ open: true, component });
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-700">Attached Components</p>
        <Button
          className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} /> <span>Add Component</span>
        </Button>
      </div>

      {showAddForm && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Select Components to Attach</h3>
          {isLoadingAvailable ? (
            <div className="text-gray-600">Loading components...</div>
          ) : filteredAvailableComponents.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredAvailableComponents.map((comp) => (
                <label key={comp.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(comp.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedComponents([...selectedComponents, comp.id]);
                      } else {
                        setSelectedComponents(
                          selectedComponents.filter((id) => id !== comp.id)
                        );
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span>
                    {comp.componentCode} - {comp.componentType} -{" "}
                    {comp.material}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">
              No unattached components available for this project.
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => {
                if (selectedComponents.length > 0) {
                  attachMutation.mutate(
                    { weldJointId: joint.id, componentIds: selectedComponents },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["components", joint?.id],
                        });
                        setShowAddForm(false);
                        setSelectedComponents([]);
                        toast.success("Components attached successfully.");
                      },
                      onError: (error) => {
                        toast.error(
                          error.message || "Failed to attach components."
                        );
                      },
                    }
                  );
                }
              }}
              disabled={
                selectedComponents.length === 0 || attachMutation.isPending
              }
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {attachMutation.isPending ? "Attaching..." : "Attach Selected"}
            </Button>
            <Button
              onClick={() => {
                setShowAddForm(false);
                setSelectedComponents([]);
              }}
              className="px-4 py-2 border border-gray-400 rounded bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="p-4 text-gray-600">
          Loading Weld Joint Components...
        </div>
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
                  <td className="px-4 py-2">
                    {c.attachedComponent.componentCode}
                  </td>
                  <td className="px-4 py-2">
                    {c.attachedComponent.componentType}
                  </td>
                  <td className="px-4 py-2">{c.attachedComponent.material}</td>
                  <td className="px-4 py-2">{c.attachedComponent.diameter}</td>
                  <td className="px-4 py-2">{c.attachedComponent.length}</td>
                  <td className="px-4 py-2">{c.attachedComponent.thickness}</td>
                  <td className="px-4 py-2">
                    {c.attachedComponent.pipeNumber}
                  </td>
                  <td className="px-4 py-2">
                    {c.attachedComponent.heatNumber}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      className="text-red-600 hover:text-red-800 p-1"
                      onClick={() => openDetachDialog(c)}
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
        !isLoading && (
          <p className="text-sm text-gray-500 mt-2">No components found.</p>
        )
      )}

      {/* Detach confirmation */}
      <AlertDialog
        open={detachDialog.open}
        onOpenChange={(open) =>
          setDetachDialog({
            open,
            component: open ? detachDialog.component : null,
          })
        }
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Detach Component</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to detach the component "
              {detachDialog.component?.attachedComponent.componentCode}" from
              this weld joint? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleDetachConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={detachMutation.isPending}
            >
              {detachMutation.isPending ? "Detaching..." : "Detach"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ComponentsSection;
