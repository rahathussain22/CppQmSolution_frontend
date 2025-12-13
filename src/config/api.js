// src/config/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class API {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
      // Remove the default Content-Type header
      // headers: { "Content-Type": "application/json" },
    });

    // Add request interceptor for token AND content-type
    this.axios.interceptors.request.use(
      (config) => {
        // Always get accessToken live from localStorage
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"];
        }

        // Set Content-Type to application/json only if not already set
        // and if data is not FormData
        if (
          !config.headers["Content-Type"] &&
          !(config.data instanceof FormData)
        ) {
          config.headers["Content-Type"] = "application/json";
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor remains the same
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        const url = error.config?.url;

        if (status === 401 && !url.includes("/login")) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          window.location.href = "/login"; // better than reload
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
        headers: { ...headers },
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
  patch(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "PATCH", body });
  }
}

const api = new API(API_BASE_URL);
export default api;
