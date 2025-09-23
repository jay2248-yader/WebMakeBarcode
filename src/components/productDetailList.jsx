import React from "react";
import ProductDetailCard from "./ProductDetailCard";

const ProductDetailList = ({ productPrices }) => {
  if (!productPrices || productPrices.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No product details available.</p>;
  }

  // ถ้ามีแค่ 1 ตัว จัดตรงกลาง
  if (productPrices.length === 1) {
    return (
      <div className="flex justify-center mt-6">
        <ProductDetailCard priceData={productPrices[0]} />
      </div>
    );
  }

  // ถ้ามีหลายตัว ใช้ grid ตามเดิม
  return (
    <div
      className="
        grid gap-10 mt-6
        w-full
        max-w-full
        md:max-w-5xl
        lg:max-w-6xl
        xl:max-w-7xl
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-2
        mx-auto
      "
    >
      {productPrices.map((priceData, index) => (
        <ProductDetailCard key={index} priceData={priceData} />
      ))}
    </div>
  );
};

export default ProductDetailList;
