// src/services/productPriceService.js
import api from "./api";

// ดึง endpoint จาก env
const PRODUCTPRICE_ENDPOINT = import.meta.env.VITE_API_PRODUCTPRICE;

/**
 * Fetch product price by search term
 * @param {string} search 
 * @returns {Promise<object>} 
 */
export const fetchProductPrice = async (search = "") => {
  try {
    const response = await api.get(PRODUCTPRICE_ENDPOINT, {
      params: { search },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching product price:", error);
    throw error;
  }
};
