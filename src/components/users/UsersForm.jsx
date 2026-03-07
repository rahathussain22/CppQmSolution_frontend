import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const PERMISSIONS = [
  { value: "view", label: "View" },
  { value: "view+add", label: "View and Add" },
  { value: "view+add+update", label: "View, Add, and Update" },
  { value: "all", label: "All Permissions" },
];

export function UsersForm({
  user,
  isEditing = false,
  isSaving = false,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    password: "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    employeeId: user?.employeeId || "",
    department: user?.department || "",
    role: user?.role || "",
    permissions: user?.permissions || "view",
  });

  useEffect(() => {
    setFormData({
      username: user?.username || "",
      password: "",
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      employeeId: user?.employeeId || "",
      department: user?.department || "",
      role: user?.role || "",
      permissions: user?.permissions || "view",
    });
  }, [user, isEditing]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = useMemo(() => {
    const baseValid =
      formData.username?.trim() &&
      formData.fullName?.trim() &&
      formData.employeeId?.trim() &&
      formData.department?.trim() &&
      formData.role?.trim() &&
      formData.permissions?.trim();

    if (!baseValid) return false;

    // On create, password is required. On edit, password is optional (only for changing).
    if (!isEditing) return Boolean(formData.password?.trim());
    return true;
  }, [
    formData.username,
    formData.fullName,
    formData.employeeId,
    formData.department,
    formData.role,
    formData.permissions,
    formData.password,
    isEditing,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Never expose old password. On edit, only send password if user typed a new one.
    const payload = { ...formData };
    if (isEditing && !payload.password?.trim()) {
      delete payload.password;
    }

    onSave?.(payload);
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 border-2 border-gray-300 rounded shadow-md mb-4">
      <div className="bg-linear-to-b from-gray-800 to-black text-white px-3 py-2 flex items-center justify-between">
        <h2 className="text-sm font-bold">
          {isEditing ? "Edit User" : "Create User"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-12 gap-3 mb-3">
          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs text-gray-700 mb-1">
              {isEditing ? "New Password" : "Password *"}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              disabled={isSaving}
              placeholder={
                isEditing ? "Leave blank to keep unchanged" : "Required"
              }
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-6">
            <label className="block text-xs text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Employee ID *
            </label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => updateField("employeeId", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Department *
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => updateField("department", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              disabled={isSaving}
              placeholder="e.g., admin"
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-xs text-gray-700 mb-1">
              Permissions *
            </label>
            <select
              value={formData.permissions}
              onChange={(e) => updateField("permissions", e.target.value)}
              disabled={isSaving}
              className="w-full px-2 py-1 text-sm border border-gray-400 rounded disabled:bg-gray-100"
            >
              {PERMISSIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            className="px-4 py-1 text-sm bg-gray-800 text-white border border-gray-800 rounded hover:bg-black"
            disabled={isSaving || !isValid}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 text-sm border border-gray-400 rounded bg-white hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}