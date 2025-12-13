import api from "../config/api";

export const createWeldJoint = async () => {

}

export const getWeldJoints = async ({ pipelineId }) => {
    const queryParams = new URLSearchParams();
    if (pipelineId) {
        queryParams.append("projectId", pipelineId);
    }

    const response = await api.get(
        `/weldJoint/getWeldJoints?${queryParams.toString()}`
    );
    return response;
}

export const getWeldJointComponents = async ({ weldJointId }) => {

    const queryParams = new URLSearchParams();
    if (weldJointId) {
        queryParams.append("weldJointId", weldJointId);
    }

    const response = await api.get(
        `/weldJoint/getWeldJointComponents?${queryParams.toString()}`
    );
    return response;
}