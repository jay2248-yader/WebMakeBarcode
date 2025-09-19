// src/services/productService.js
import api from "./api";

export const fetchProducts = async ({ page = 1, limit = 25, search = "" } = {}) => {
  try {
    const response = await api.get("/products/productall", {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
