import api from "../config/api";

export async function getDatabase() {
  // Adjust endpoint as needed by backend
  const result = await api.get("/masterDatabase/getDatabase");
  return result;
}
