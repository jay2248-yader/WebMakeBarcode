// src/components/ProductDetailList.jsx
import React from "react";
import ProductDetailCard from "./productDetailCard";

const ProductDetailList = ({ productPrices }) => {
  if (!productPrices || productPrices.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No product details available.</p>;
  }

  return (
    <div className="flex flex-col items-center mt-6">
      {productPrices.map((priceData, index) => (
        <ProductDetailCard key={index} priceData={priceData} />
      ))}
    </div>
  );
};

export default ProductDetailList;
