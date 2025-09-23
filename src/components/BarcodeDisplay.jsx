// src/components/BarcodeDisplay.jsx
import React from "react";
import Barcode from "react-barcode";

const BarcodeDisplay = ({ barcodes }) => {
  if (!barcodes || barcodes.length === 0) {
    return <p className="text-gray-500 text-center">ບໍ່ມີຂໍ້ມູນ Barcode</p>;
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto px-2">
      {barcodes.map((bc, idx) => {
        const product = bc.product || {};
        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center space-y-3"
          >
            {/* Product Name */}
            <p className="font-semibold text-gray-800 text-center">{product.NAMETH || "Unknown Product"}</p>

            {/* Product Code and Unit */}
            <p className="text-sm text-gray-500">
              Code: {product.CODE || bc.PRODUCTCODE || "N/A"} | Unit: {bc.UNITCODE || product.SALEUNIT || "N/A"}
            </p>

            {/* Barcode */}
            <Barcode value={bc.BARCODE || ""} format="CODE128" width={2} height={80} displayValue={false} />

            {/* Barcode Number */}
            <p className="text-sm font-mono text-gray-700">{bc.BARCODE || "-"}</p>

            {/* Barcode Text */}
            <p className="text-xs text-gray-600 text-center">{bc.BARCODETEXT || "-"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BarcodeDisplay;
