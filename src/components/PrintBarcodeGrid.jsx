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
  // แปลง barcodes ให้แสดงแต่ละ quantity เป็น item แยก (เหมือน BarcodePreview)
  const expandedBarcodes = [];
  barcodes.forEach(item => {
    const quantity = item.quantity || 1;
    for (let i = 0; i < quantity; i++) {
      expandedBarcodes.push({
        ...item,
        // เพิ่ม unique key เพื่อไม่ให้ซ้ำ
        _uniqueId: `${item.BARCODE}-${item.PRICE}-${i}`
      });
    }
  });

  // คำนวณจำนวน items ต่อหน้า
  const itemsPerPage = columns * rows;
  
  // สร้าง array สำหรับแต่ละหน้า
  const pages = [];
  for (let i = 0; i < expandedBarcodes.length; i += itemsPerPage) {
    pages.push(expandedBarcodes.slice(i, i + itemsPerPage));
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
              key={item._uniqueId || `${item.BARCODE}-${pageIndex}-${idx}`}
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