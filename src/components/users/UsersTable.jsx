import { Pencil, Trash2 } from "lucide-react";

export function UsersTable({ users = [], canManage = false, onEdit, onDelete }) {
  if (!users.length) {
    return <div className="p-4 text-gray-500">No users found.</div>;
  }

  return (
    <div className="bg-white border-2 border-gray-300 rounded shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="text-sm w-full">
          <thead>
            <tr className="bg-linear-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {canManage && (
                <th className="px-3 py-2 text-left text-xs w-20">Actions</th>
              )}
              <th className="px-3 py-2 text-left text-xs">#</th>
              <th className="px-3 py-2 text-left text-xs">Username</th>
              <th className="px-3 py-2 text-left text-xs">Full Name</th>
              <th className="px-3 py-2 text-left text-xs">Email</th>
              <th className="px-3 py-2 text-left text-xs">Phone</th>
              <th className="px-3 py-2 text-left text-xs">Employee ID</th>
              <th className="px-3 py-2 text-left text-xs">Department</th>
              <th className="px-3 py-2 text-left text-xs">Role</th>
              <th className="px-3 py-2 text-left text-xs">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u.id}
                className="border-b border-gray-300 hover:bg-gray-50 relative"
              >
                {canManage && (
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit?.(u)}
                        className="text-gray-700 hover:text-gray-900"
                        aria-label={`Edit ${u.username}`}
                        type="button"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(u)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Delete ${u.username}`}
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-3 py-2 text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 font-medium">{u.username}</td>
                <td className="px-3 py-2">{u.fullName}</td>
                <td className="px-3 py-2">{u.email || "-"}</td>
                <td className="px-3 py-2">{u.phoneNumber || "-"}</td>
                <td className="px-3 py-2">{u.employeeId}</td>
                <td className="px-3 py-2">{u.department}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-1 text-xs rounded font-medium bg-gray-100 text-gray-800">
                    {u.permissions}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}