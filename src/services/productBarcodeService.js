// src/services/productBarcodeService.js
import api from "./api";

const PRODUCTBARCODE_ENDPOINT = import.meta.env.VITE_API_PRODUCTALL_BARCODE;

/**
 * Fetch product barcodes by search term
 * @param {string} search 
 * @returns {Promise<object>} 
 */
export const fetchProductBarcodes = async (search = "") => {
  try {
    const response = await api.get(PRODUCTBARCODE_ENDPOINT, {
      params: { search },
    });
    return response.data; // { success, statuscode, message, data_id }
  } catch (error) {
    console.error("Error fetching product barcodes:", error);
    throw error;
  }
};
