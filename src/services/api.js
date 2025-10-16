import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // env
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    const isTokenValid = useAuthStore.getState().isTokenValid();
    
    // ตรวจสอบ token ก่อนส่ง request
    if (token && isTokenValid) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && !isTokenValid) {
      // Token หมดอายุแล้ว ให้ล้างออก
      console.log("Token expired, clearing auth...");
      useAuthStore.getState().clearAuth();
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // จัดการกับ 401 Unauthorized และ 500 Internal Server Error
    if (error.response?.status === 401 || error.response?.status === 500) {
      console.log("Authentication error, logging out...");
      useAuthStore.getState().clearAuth();
      
      // Redirect ไปหน้า login ถ้าอยู่ในหน้าอื่น
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
