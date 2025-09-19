import axios from "axios";
import { useAuthStore } from "../store/authStore"; 
import { logout } from "./authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ ใช้ env
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) logout();
    return Promise.reject(error);
  }
);

export default api;
