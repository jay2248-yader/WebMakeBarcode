import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ code, name, grwarehouse, grlocation, unit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${code}`); // ไปหน้า ProductDetails พร้อมส่ง code
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full hover:shadow-2xl transition duration-300"
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-blue-800 mb-1">{code}</h1>
        <h2 className="text-lg font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-500">
          GRWAREHOUSE: {grwarehouse} ({grlocation})
        </p>
        <p className="text-sm text-gray-500">Unit: {unit}</p>
      </div>
    </div>
  );
};

export default ProductCard;
