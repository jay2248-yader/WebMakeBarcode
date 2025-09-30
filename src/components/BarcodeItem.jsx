// components/BarcodeItem.jsx
import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodeItem = ({
  item,
  barcodeType,
  lineColor,
  barcodeWidth,
  barcodeHeight,
  labelWidth,
  labelHeight,
  showText = true,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && item?.BARCODE) {
      JsBarcode(svgRef.current, item.BARCODE, {
        format: barcodeType,
        displayValue: false,
        lineColor,
        background: "#ffffff",
        width: Math.max(1, barcodeWidth),
        height: barcodeHeight,
        // Quiet zone (important for scanners). JsBarcode uses px units here.
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 12,
        marginRight: 12,
      });
    }
  }, [item?.BARCODE, barcodeType, lineColor, barcodeWidth, barcodeHeight]);

  return (
    <div
      className="label"
      style={{
        width: `${labelWidth}mm`,
        height: `${labelHeight}mm`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: "9pt",
        textAlign: "center",
        boxSizing: "border-box",
        border: "1px dashed transparent", // ใช้ตอนพรีวิวหากต้องการไกด์
      }}
    >
      <svg
        ref={svgRef}
        role="img"
        aria-label={`Barcode for ${item?.BARCODE ?? ""}`}
        style={{
          width: `${labelWidth * 0.9}mm`,
          height: `${Math.min(barcodeHeight, labelHeight * 0.6)}mm`,
        }}
      />
      {showText && (
        <div className="barcode-text" style={{ fontSize: "8pt", marginTop: "2px" }}>
          {item?.BARCODE ?? "—"}
        </div>
      )}
    </div>
  );
};

export default BarcodeItem;
