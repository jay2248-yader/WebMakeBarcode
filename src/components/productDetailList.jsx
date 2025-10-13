import React, { useState, useEffect } from "react";
import ProductDetailCard from "./productDetailCard";
import AlertIcon from "../assets/alert-svgrepo.svg"; // ✅ import SVG

const ProductDetailList = ({ productPrices = [], barcodeData = [], addToCart }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

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

    return () => clearInterval(intervalId);
  }, [dataToDisplay, isFlipped]);

  // ✅ กรณีไม่มีข้อมูล ใช้ SVG ของ alert
  if (!dataToDisplay.length) {
    return (
<div className="flex items-center justify-center mt-1">
  <div className="w-full max-w-lg">
    <div className="bg-white/90 border border-red-400 shadow-xl rounded-2xl p-8 text-center">
      <div className="mx-auto w-30 h-30 flex items-center justify-center -mt-4">
        <img src={AlertIcon} alt="Alert" className="w-30 h-30" />
      </div>
      <h3 className="text-xl font-bold text-black">ບໍ່ພົບລາຍລະອຽດສິນຄ້າ</h3>
      <p className="mt-2 text-gray-700">
        ລອງຄົ້ນຫາດ້ວຍຊື່ຫຼືລະຫັດສິນຄ້າອື່ນ.
      </p>
    </div>
  </div>
</div>

    );
  }

  const cardsToRender = dataToDisplay.slice(0, visibleCount);

  if (cardsToRender.length === 1) {
    const item = cardsToRender[0];
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
