import React, { useState, useEffect } from "react";
import ProductDetailCard from "./productDetailCard";

const ProductDetailList = ({ productPrices = [], barcodeData = [] , addToCart}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1); // สำหรับโหลดทีละอัน

  const FlipButton = () => (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="
          bg-gradient-to-r from-blue-500 to-purple-600 
          hover:from-blue-600 hover:to-purple-700
          text-white font-semibold py-3 px-8 rounded-xl
          shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          transition-all duration-200
          flex items-center space-x-3
        "
      >
        <span className="text-2xl">🔄</span>
        <span className="text-lg font-semibold">
          {isFlipped ? "ສິນຄ້າມີລາຄາບໍ່ມີລາຄາ" : "ສິນຄ້າມີລາຄາ"}
        </span>
      </button>
    </div>
  );

  const dataToDisplay = isFlipped ? barcodeData : productPrices;

useEffect(() => {
  setVisibleCount(1);
  if (dataToDisplay.length <= 1) return;

  let intervalId;
  intervalId = setInterval(() => {
    setVisibleCount((prev) => {
      const next = prev + 1;
      if (next >= dataToDisplay.length) {
        clearInterval(intervalId);
      }
      return next;
    });
  }, 200);

  return () => clearInterval(intervalId); // cleanup ป้องกัน interval ค้าง
}, [dataToDisplay, isFlipped]);


  // กรณีไม่มีข้อมูล
  if (!dataToDisplay.length) {
    return <p className="text-center text-gray-500 mt-4">No product details available.</p>;
  }

  const cardsToRender = dataToDisplay.slice(0, visibleCount);

  // กรณีการ์ดเดียว จัดตรงกลาง
  if (cardsToRender.length === 1) {
    const item = cardsToRender[0];
    console.log(`Rendering single card: ${isFlipped ? "Back (Barcode)" : "Front (Price)"}`);
    return (
      <div className="mt-6">
        <FlipButton />
        <div className="flex justify-center">
          <ProductDetailCard
            priceData={isFlipped ? {} : item}
            isFlipped={isFlipped}
            disableClick={true}
            barcodeData={isFlipped ? [item] : []}
            addToCart={addToCart} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <FlipButton />
      <div className="grid gap-10 w-full max-w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl grid-cols-1 md:grid-cols-2 mx-auto">
        {cardsToRender.map((item, index) => (
          <ProductDetailCard
            key={index}
            priceData={isFlipped ? {} : item}
            isFlipped={isFlipped}
            disableClick={true}
            barcodeData={isFlipped ? [item] : []}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailList;
