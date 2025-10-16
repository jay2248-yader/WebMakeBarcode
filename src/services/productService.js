// src/services/productService.js
import api from "./api";
import { useAuthStore } from "../store/authStore";

// ดึง endpoint จาก env
const PRODUCTS_ENDPOINT = import.meta.env.VITE_API_PRODUCTS;

export const fetchProducts = async ({ page = 1, limit = 25, search = "" } = {}) => {
  try {
    // ตรวจสอบ token ก่อนส่ง request
    const isTokenValid = useAuthStore.getState().isTokenValid();
    if (!isTokenValid) {
      throw new Error("Token expired or invalid. Please login again.");
    }

    const response = await api.get(PRODUCTS_ENDPOINT, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // ถ้าเป็น authentication error ให้ redirect ไป login
    if (error.response?.status === 401 || error.response?.status === 500) {
      console.log("Authentication error detected, redirecting to login...");
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    throw error;
  }
};
