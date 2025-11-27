import axiosInstance from "../config/api";

export const login = async(employeeId, password, role)=>{
    try {
        const requestBody = {
            employeeId,
            password,
            role
        }
        const response = await axiosInstance.post(`/auth/login`,requestBody)
        return response
    } catch (error) {
        throw error
    }
}   