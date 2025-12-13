import api from "../config/api";

export const createWeldJoint = async (formData) => {
  return await api.post("/weldJoint/create", formData);
};

export const updateWeldJoint = async ({ weldJointId, formData }) => {
  return await api.patch(`/weldJoint/update/${weldJointId}`, formData);
};

export const getWeldJoints = async ({ projectId, pipelineId } = {}) => {
  const queryParams = new URLSearchParams();
  if (projectId) {
    queryParams.append("projectId", projectId);
  }
  if (pipelineId) {
    queryParams.append("pipelineId", pipelineId);
  }

  const response = await api.get(
    `/weldJoint/getWeldJoints?${queryParams.toString()}`
  );
  return response;
};

export const getWeldJointComponents = async ({ weldJointId } = {}) => {
  const queryParams = new URLSearchParams();
  if (weldJointId) {
    queryParams.append("weldJointId", weldJointId);
  }

  const response = await api.get(
    `/weldJoint/getWeldJointComponents?${queryParams.toString()}`
  );
  return response;
};

export const deleteWeldJoint = async ({ weldJointId }) => {
  return await api.delete(`/weldJoint/delete/${weldJointId}`);
};

export const attachWeldJointComponents = async ({
  weldJointId,
  componentIds,
}) => {
  return await api.post(`/weldJoint/${weldJointId}/attachComponents`, {
    components: componentIds.map((id) => ({
      componentId: id,
    })),
  });
};

export const detachWeldJointComponents = async ({
  weldJointId,
  componentId,
}) => {
  return await api.delete(
    `/weldJoint/${weldJointId}/components/${componentId}`
  );
};
