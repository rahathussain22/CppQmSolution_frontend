import api from "../config/api";

export async function getDatabase({ cursor = null, prevCursor = null, limit = 10 } = {}) {
  const params = { limit };
  if (cursor) params.cursor = cursor;
  if (prevCursor) params.prevCursor = prevCursor;

  const result = await api.get("/masterDatabase/getDatabase", { params });
  return result;
}
