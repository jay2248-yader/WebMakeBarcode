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
  // คำนวณจำนวน items ต่อหน้า
  const itemsPerPage = columns * rows;
  
  // สร้าง array สำหรับแต่ละหน้า
  const pages = [];
  for (let i = 0; i < currentBarcodes.length; i += itemsPerPage) {
    pages.push(currentBarcodes.slice(i, i + itemsPerPage));
  }

  return (
    <div style={{ background: "#fff", padding: "10px" }}>
      {pages.map((pageBarcodes, pageIndex) => (
        <div
          key={pageIndex}
          id={`print-area-${pageIndex}`}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, ${labelWidth}mm)`,
            gridTemplateRows: `repeat(${rows}, ${labelHeight}mm)`,
            gap: `${marginBottom}mm ${marginRight}mm`,
            width: `${paperWidth}mm`,
            height: `${paperHeight}mm`,
            background: "#fff",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          {Array.from({ length: itemsPerPage }).map((_, idx) => {
            const item = pageBarcodes[idx];
            
            // ถ้ามี item ในตำแหน่งนี้
            if (item) {
              return (
                <BarcodeItem
                  key={`${item.BARCODE}-${pageIndex}-${idx}`}
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
              );
            }
            
            // ถ้าไม่มี item ให้แสดงกล่องว่าง
            return (
              <div
                key={`empty-${pageIndex}-${idx}`}
                style={{
                  width: `${labelWidth}mm`,
                  height: `${labelHeight}mm`,
                  border: "1px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "12px",
                  background: "#f9f9f9",
                }}
              >
                ว่าง
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BarcodePreview;