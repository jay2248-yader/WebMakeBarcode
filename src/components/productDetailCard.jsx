// src/components/ProductDetailCard.jsx
import React, { useState } from "react";
import ProductDetailFront from "./ProductDetailFront";
import ProductDetailBack from "./ProductDetailBack";
import useBarcodeCartStore from "../store/barcodeCartStore";

const ProductDetailCard = ({ priceData, isFlipped: externalIsFlipped = false, disableClick = false, barcodeData = null }) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  const isFlipped = disableClick ? externalIsFlipped : internalIsFlipped;

  const handleCardClick = () => {
    if (!disableClick) setInternalIsFlipped(!internalIsFlipped);
  };

  const barcodes = priceData.productbarcode
    ? Array.isArray(priceData.productbarcode)
      ? priceData.productbarcode
      : [priceData.productbarcode]
    : [];

  // ✅ ใช้ store ตรง ๆ
  const addBarcode = useBarcodeCartStore((state) => state.addBarcode);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div
        className={`relative w-full min-h-[600px] [perspective:1000px] ${disableClick ? "" : "cursor-pointer"}`}
        onClick={handleCardClick}
      >
        <div
          className={`relative transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Front Side */}
          <div className="[backface-visibility:hidden]">
            <ProductDetailFront
              productData={barcodes[0]?.product || {}}
              DOCNO={priceData.DOCNO}
              UNITCODE={priceData.UNITCODE}
              prices={[
                priceData.SALEPRICE1,
                priceData.SALEPRICE2,
                priceData.SALEPRICE3,
                priceData.SALEPRICE4,
              ]}
              barcodes={barcodes}
              addToCart={addBarcode}  
            />
          </div>

          {/* Back Side */}
          <div className="absolute top-0 left-0 w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <ProductDetailBack barcodeData={barcodeData} addToCart={addBarcode} />
          </div>
        </div>
      </div>

      {!disableClick && (
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            🔄 Click the card to flip and see {isFlipped ? "front" : "back"} side
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailCard;
