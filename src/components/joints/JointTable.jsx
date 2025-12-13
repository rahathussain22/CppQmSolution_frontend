import { Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function JointTable({
  joints = [],
  onEdit,
  onDelete,
  onSelectJoint,
  ComponentsSection,
}) {
  const user = useAuthStore((state) => state.user);
  const [openJointId, setOpenJointId] = useState(null);

  if (!joints.length) {
    return <div className="p-4 text-gray-500">No weld joints found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {user.permissions === "all" && (
                <th className="px-3 py-2 text-left text-xs w-10">&nbsp;</th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Project</th>
              <th className="px-3 py-2 text-left text-xs">Pipeline</th>
              <th className="px-3 py-2 text-left text-xs">Weld Number</th>
              <th className="px-3 py-2 text-left text-xs">Sequence Number</th>
              <th className="px-3 py-2 text-left text-xs">WPS ID</th>
              <th className="px-3 py-2 text-left text-xs">Weld Type</th>
              <th className="px-3 py-2 text-left text-xs">Location</th>
              <th className="px-3 py-2 text-left text-xs">Pre-Heat Temp</th>
              <th className="px-3 py-2 text-left text-xs">PWHT</th>
              <th className="px-3 py-2 text-left text-xs">Welding Process</th>
              <th className="px-3 py-2 text-left text-xs">NDT %</th>
              <th className="px-3 py-2 text-left text-xs">Is Tracer</th>
              <th className="px-3 py-2 text-left text-xs">Status</th>
              <th className="px-3 py-2 text-left text-xs">Final Acceptance</th>
              <th className="px-3 py-2 text-left text-xs">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {joints.map((joint, index) => {
              const isOpen = openJointId === joint.id;
              return (
                <>
                  <tr
                    key={joint.id}
                    onClick={() => {
                      setOpenJointId(isOpen ? null : joint.id);
                      onSelectJoint && onSelectJoint(joint);
                    }}
                    className={`border-b border-gray-300 cursor-pointer transition-colors ${
                      isOpen ? "bg-red-100" : "hover:bg-gray-50"
                    }`}
                  >
                    {user.permissions === "all" && (
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit && onEdit(joint);
                            }}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete && onDelete(joint);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-3 py-2">{joint.projectId || "-"}</td>
                    <td className="px-3 py-2">{joint.pipelineId || "-"}</td>
                    <td className="px-3 py-2">{joint.weldNumber}</td>
                    <td className="px-3 py-2">{joint.sequenceNumber || "-"}</td>
                    <td className="px-3 py-2">{joint.wpsId || "-"}</td>
                    <td className="px-3 py-2">{joint.weldType || "-"}</td>
                    <td className="px-3 py-2">{joint.weldLocation || "-"}</td>
                    <td className="px-3 py-2">
                      {joint.preHeatTempRequired || "-"}
                    </td>
                    <td className="px-3 py-2">
                      {joint.pwhtRequired ? "Yes" : "No"}
                    </td>
                    <td className="px-3 py-2">{joint.weldingProcess || "-"}</td>
                    <td className="px-3 py-2">{joint.ndtPercentage || "-"}</td>
                    <td className="px-3 py-2">
                      {joint.isTracer ? "Yes" : "No"}
                    </td>
                    <td className="px-3 py-2">{joint.weldStatus || "-"}</td>
                    <td className="px-3 py-2">
                      {joint.finalAcceptanceDate
                        ? new Date(
                            joint.finalAcceptanceDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-3 py-2">{joint.remarks || "-"}</td>
                  </tr>
                  {isOpen && ComponentsSection && (
                    <tr className="border-b border-gray-300">
                      <td
                        colSpan={user.permissions === "all" ? 17 : 16}
                        className="p-4 bg-gray-50"
                      >
                        <ComponentsSection joint={joint} />
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
