// src/config/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class API {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });
    // Add request interceptor for token
    this.axios.interceptors.request.use(
      (config) => {
        // Always get accessToken live from localStorage to support multi-tab auth
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"];
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // Add response interceptor to auto logout on 401 (token expired)
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalid, clear storage and reload
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          // Optionally can redirect to /login directly, but reload ensures state reset
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  async request(
    endpoint,
    { method = "GET", body, headers = {}, ...options } = {}
  ) {
    try {
      const config = {
        url: endpoint,
        method,
        headers,
        ...options,
      };
      if (body) config.data = body;
      const response = await this.axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        let err = new Error(error.response.data?.message || error.message);
        err.response = error.response;
        throw err;
      }
      throw error;
    }
  }

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: "GET" });
  }
  post(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "POST", body });
  }
  put(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "PUT", body });
  }
  delete(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "DELETE", body });
  }
}

const api = new API(API_BASE_URL);
export default api;
