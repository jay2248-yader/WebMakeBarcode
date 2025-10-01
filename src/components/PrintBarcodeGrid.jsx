import React from "react";
import BarcodeItem from "./BarcodeItem";

const PrintBarcodeGrid = ({
  barcodes,
  barcodeType,
  lineColor,
  barcodeWidth,
  barcodeHeight,
  labelWidth,
  labelHeight,
  columns,
  rows,
  marginRight,
  marginBottom,
  paperWidth,
  paperHeight
}) => {
  // คำนวณจำนวน items ต่อหน้า
  const itemsPerPage = columns * rows;
  
  // สร้าง array สำหรับแต่ละหน้า
  const pages = [];
  for (let i = 0; i < barcodes.length; i += itemsPerPage) {
    pages.push(barcodes.slice(i, i + itemsPerPage));
  }

  return (
    <div>
      {pages.map((pageBarcodes, pageIndex) => (
        <div 
          key={pageIndex} 
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, ${labelWidth}mm)`,
            gridTemplateRows: `repeat(${rows}, ${labelHeight}mm)`,
            gap: `${marginBottom}mm ${marginRight}mm`,
            width: `${paperWidth}mm`,
            height: `${paperHeight}mm`,
            background: "white",
            padding: "0",
            margin: "0",
            boxSizing: "border-box",
            pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto"
          }}
        >
          {pageBarcodes.map((item, idx) => (
            <BarcodeItem
              key={`${item.BARCODE}-${pageIndex}-${idx}`}
              item={item}
              barcodeType={barcodeType}
              lineColor={lineColor}
              barcodeWidth={barcodeWidth}
              barcodeHeight={barcodeHeight}
              labelWidth={labelWidth}
              labelHeight={labelHeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PrintBarcodeGrid;