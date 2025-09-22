// src/services/productService.js
import api from "./api";

// ดึง endpoint จาก env
const PRODUCTS_ENDPOINT = import.meta.env.VITE_API_PRODUCTS;

export const fetchProducts = async ({ page = 1, limit = 25, search = "" } = {}) => {
  try {
    const response = await api.get(PRODUCTS_ENDPOINT, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
