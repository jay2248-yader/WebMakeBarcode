import React, { useState, useEffect } from "react";
import ProductDetailCard from "./ProductDetailCard";

const ProductDetailList = ({ productPrices = [], barcodeData = [] }) => {
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
          {isFlipped ? "Back: Barcodes" : "Front: Product Prices"}
        </span>
      </button>
    </div>
  );

  const dataToDisplay = isFlipped ? barcodeData : productPrices;

  useEffect(() => {
    setVisibleCount(1); // รีเซ็ตเมื่อ flip
    if (dataToDisplay.length <= 1) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev + 1;
        console.log(
          `Rendering card ${next} / ${dataToDisplay.length} - ${
            isFlipped ? "Back (Barcode)" : "Front (Price)"
          }`
        );
        if (next >= dataToDisplay.length) {
          clearInterval(interval);
        }
        return next;
      });
    }, 200); // เวลา delay ระหว่าง render การ์ด
    return () => clearInterval(interval);
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
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailList;
