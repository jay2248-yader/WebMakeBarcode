import React from "react";
import BarcodeItem from "./BarcodeItem";

const BarcodePreview = ({
  currentBarcodes,
  labelWidth,
  labelHeight,
  columns,
  rows,
  marginRight,
  marginBottom,
  barcodeType,
  lineColor,
  barcodeWidth,
  barcodeHeight,
  paperWidth,
  paperHeight,
}) => {
  return (
    <div
      id="print-area"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, ${labelWidth}mm)`,
        gridTemplateRows: `repeat(${rows}, ${labelHeight}mm)`,
        gap: `${marginBottom}mm ${marginRight}mm`,
        width: `${paperWidth}mm`,
        height: `${paperHeight}mm`,
        background: "#fff",
      }}
    >
      {currentBarcodes.map((item, idx) => (
        <BarcodeItem
          key={`${item.BARCODE}-${idx}`}
          item={item}
          barcodeType={barcodeType}
          lineColor={lineColor}
          barcodeWidth={barcodeWidth}
          barcodeHeight={barcodeHeight}
          labelWidth={labelWidth}
          labelHeight={labelHeight}
          marginRight={marginRight}
          marginBottom={marginBottom}
        />
      ))}
    </div>
  );
};

export default BarcodePreview;
