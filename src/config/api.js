// src/axiosInstance.js
import axios from "axios";

// Base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Optional: Add request interceptor (for adding auth token)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken"); // Example: JWT token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Add response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle global errors
//     if (error.response?.status === 401) {
//       console.log("Unauthorized! Redirecting to login...");
//       // redirect to login if needed
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
