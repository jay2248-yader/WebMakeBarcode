// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ name, barcode, unit, price }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full hover:shadow-2xl transition duration-300">
      {/* ข้อมูลสินค้า */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-500">Barcode: {barcode}</p>
        <p className="text-sm text-gray-500">Unit: {unit}</p>
      </div>

      {/* ราคา + ปุ่ม */}
      <div className="mt-3 sm:mt-0 flex items-center gap-4">
        <span className="text-xl font-bold text-green-600">{price} ₭</span>
      </div>
    </div>
  );
};

export default ProductCard;
