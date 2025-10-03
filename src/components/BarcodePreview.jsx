import React from "react";
import BarcodeItem from "./BarcodeItem";
import useBarcodeCartStore from "../store/barcodeCartStore";

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
  const { decreaseBarcode } = useBarcodeCartStore();

  // แปลง barcodes ให้แสดงแต่ละ quantity เป็น item แยก
  const expandedBarcodes = [];
  currentBarcodes.forEach((item) => {
    const quantity = item.quantity || 1;
    for (let i = 0; i < quantity; i++) {
      expandedBarcodes.push({
        ...item,
        _uniqueId: `${item.BARCODE}-${item.PRICE}-${i}`,
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
    <div
      style={{
        background: "#fff",
        padding: "10px",
        maxHeight: "90vh", // ✅ จำกัดความสูง preview
        overflowY: "auto", // ✅ ถ้าเกินเลื่อนลงได้
        overflowX: "auto", // ✅ ถ้าเกินกว้าง เลื่อนได้
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
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

            if (item) {
              return (
                <div
                  key={item._uniqueId || `${item.BARCODE}-${pageIndex}-${idx}`}
                  style={{ position: "relative" }}
                >
                  <BarcodeItem
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
                  {/* ปุ่มลบ */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseBarcode(item);
                    }}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                    title="ລົບ Barcode ນີ້"
                  >
                    ×
                  </button>
                </div>
              );
            }

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
