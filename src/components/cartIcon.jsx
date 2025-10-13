// src/components/CartIcon.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useBarcodeCartStore from "../store/barcodeCartStore";
import BarcodeCartImg from "../assets/Gemini_Generated_Image_744hvn744hvn744h.png"; // ✅ นำเข้ารูปภาพ

const CartIcon = () => {
  const navigate = useNavigate();
  const barcodes = useBarcodeCartStore((state) => state.barcodes);
  const totalQuantity = barcodes.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onClick={() => navigate("/barcode-cart")}
    >
      <div className="relative group">
        {/* วงกลมพื้นหลัง */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-blue-800 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 cursor-pointer">
          <img
            src={BarcodeCartImg}
            loading="lazy"
            alt="Barcode Cart"
            className="w-full h-full object-cover rounded-full  "
          />
        </div>

        {/* Badge แสดงจำนวนสินค้า */}
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg ">
            {totalQuantity}
          </span>
        )}

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ເບິ່ງກະຕ່າ Barcode
        </span>
      </div>
    </div>
  );
};

export default CartIcon;
