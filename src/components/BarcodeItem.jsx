import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import CSCLogo from "../assets/CSCLogo.webp";
import useBarcodeCartStore from "../store/barcodeCartStore";

const BarcodeItem = ({
  item,
  barcodeType = "CODE128", // default format
  lineColor = "#000000",
  barcodeWidth = 4, // เพิ่มเป็น 4 สำหรับ TSC TTP-240 Pro
  barcodeHeight = 60, // เพิ่มเป็น 60 สำหรับความคมชัด
  labelWidth = 50, // mm
  labelHeight = 30, // mm
}) => {
  const canvasRef = useRef(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(item.NAME || item.NAMETH || "");
  const updateBarcodeName = useBarcodeCartStore(
    (state) => state.updateBarcodeName
  );

  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(
          canvasRef.current,
          item.BARCODE || item.barcode || item.code || "000000000000",
          {
            format: barcodeType,
            width: barcodeWidth,
            height: barcodeHeight,
            displayValue: false,
            margin: 8, // เพิ่ม quiet zone เป็น 8 สำหรับ thermal printer
            background: "#ffffff",
            lineColor: lineColor,
       
            valid: function (valid) {
              if (!valid) console.warn("Invalid barcode");
            },
          }
        );
      } catch (error) {
        console.error("Barcode generation error:", error);
      }
    }
  }, [item, barcodeType, lineColor, barcodeWidth, barcodeHeight]);

  const handleNameClick = () => setEditingName(true);

  const handleNameChange = (e) => setName(e.target.value);

  const handleNameBlur = () => {
    setEditingName(false);
    updateBarcodeName(item, name);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditingName(false);
      updateBarcodeName(item, name);
    }
  };

  return (
    <div
      style={{
        width: `${labelWidth}mm`,
        height: `${labelHeight}mm`,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #000",
        padding: "0.7mm",
        boxSizing: "border-box",
        background: "#fff",
        fontFamily: "'Noto Sans Lao', 'sans-serif'",
        fontSize: "12pt",
      }}
    >
      {/* โลโก้ซ้ายสุด + รหัสสินค้ากลาง */}
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <img
          src={CSCLogo}
          alt="CSC Logo"
          style={{
            width: "18px",
            height: "18px",
            objectFit: "contain",
            position: "absolute",
            left: 0,
          }}
        />
        <div
          style={{
            fontSize: "7pt",
            letterSpacing: "0.5px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {item.BARCODE || item.barcode || item.code || "N/A"}
        </div>
      </div>

      {/* พื้นที่บาร์โค้ด */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2px 0 3px 0",
          flex: "0 0 auto",
          padding: "0 3mm", // เพิ่ม padding สำหรับ thermal printer
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            imageRendering: "crisp-edges", // ให้ขอบคมชัด สแกนง่าย
          }}
        />
      </div>

      {/* ชื่อสินค้า editable */}
      <div
        style={{
          textAlign: "center",
          fontSize: "6pt",
          width: "100%",
          wordBreak: "break-all",
          whiteSpace: "normal",
          lineHeight: "1.2",
          marginTop: "1px",
        }}
      >
        {editingName ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            autoFocus
            style={{
              fontSize: "6pt",
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <span onClick={handleNameClick}>{name || "ບໍ່ມີຂໍ້ມູນ"}</span>
        )}
      </div>

      {/* รหัสสินค้า (CODE) */}
      <div style={{ textAlign: "center", fontSize: "6pt", margin: "1px" }}>
        {item.CODE ? `ລະຫັດສິນຄ້າ (${item.CODE})` : ""}
      </div>

      {/* ราคา */}
      {item.PRICE &&
        item.PRICE !== "ບໍ່ມີລາຄາ" &&
        item.PRICE !== "N/A" &&
        item.PRICE !== null && (
          <div
            style={{
              marginTop: "-3px",
              textAlign: "center",
              fontSize: "7pt",
              fontWeight: "bold",
            }}
          >
            ລາຄາ {item.PRICE}
          </div>
        )}
    </div>
  );
};

export default BarcodeItem;
