import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { QRCodeSVG } from "qrcode.react";
import CSCLogo from "../assets/image.svg";
import useBarcodeCartStore from "../store/barcodeCartStore";

const BarcodeItem = ({
  item,
  barcodeType = "CODE128",
  lineColor = "#000000",
  barcodeWidth = 6, // สำหรับ TSC TTP-244 Pro
  barcodeHeight = 60,
  labelWidth = 50, // mm
  labelHeight = 30, // mm
  showQR = false,
}) => {
  const svgRef = useRef(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(item.NAME || item.NAMETH || "");
  const updateBarcodeName = useBarcodeCartStore(
    (state) => state.updateBarcodeName
  );

  // 🧾 สร้างบาร์โค้ด (SVG เพื่อความคมชัดตอนพิมพ์)
  useEffect(() => {
    let isMounted = true;
    const currentSvg = svgRef.current;
    
    if (!currentSvg || !isMounted) return;
    
    try {
      JsBarcode(
        currentSvg,
        item.BARCODE || item.barcode || item.code || "000000000000",
        {
          format: barcodeType,
          width: barcodeWidth,
          height: barcodeHeight,
          displayValue: false,
          margin: 4,
          background: "transparent",
          lineColor: lineColor,
          valid: (valid) => {
            if (!valid && isMounted) console.warn("Invalid barcode");
          },
        }
      );
    } catch (error) {
      if (isMounted) {
        console.error("Barcode generation error:", error);
      }
    }
    
    return () => {
      isMounted = false;
      // Clear SVG content to prevent memory leak
      if (currentSvg) {
        while (currentSvg.firstChild) {
          currentSvg.removeChild(currentSvg.firstChild);
        }
      }
    };
  }, [item, barcodeType, lineColor, barcodeWidth, barcodeHeight]);

  // ✏️ แก้ไขชื่อสินค้า
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

  // จำกัดชื่อสินค้าให้แสดงแค่ 10 ตัวอักษร
  const displayName =
    name.length > 58 ? name.substring(0, 58).trim() + "…" : name;

  // ตรวจสอบว่ามีราคาหรือไม่
  const hasPrice = item.PRICE && 
                   item.PRICE !== "ບໍ່ມີລາຄາ" && 
                   item.PRICE !== "N/A" && 
                   item.PRICE !== null;

  return (
    <div
      style={{
        width: `${labelWidth}mm`,
        height: `${labelHeight}mm`,
        display: "flex",
        flexDirection: "column",
        border: "0px solid #000",
        padding: "0.7mm",
        boxSizing: "border-box",
        background: "#fff",
        fontFamily: "'Noto Sans Lao', 'sans-serif'",
        fontSize: "12pt",
        position: "relative",
      }}
    >
      {/* โลโก้ + รหัสบาร์โค้ด */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginTop: "-3px",
          // เพิ่ม marginBottom ถ้าไม่มีราคา
          marginBottom: !hasPrice ? "3px" : "0px",
        }}
      >
        <img
          src={CSCLogo}
          alt="CSC Logo"
          style={{
            width: "16px",
            height: "16px",
            objectFit: "contain",
            position: "absolute",
            marginTop: "1px",
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
          margin: "-2px 0 0px 0",
          flex: "0 0 auto",
          padding: "0 0mm",

        }}
      >
        <svg
          ref={svgRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            shapeRendering: "crispEdges",
          }}
        />
      </div>

      {/* ชื่อสินค้า */}
      <div
        style={{
          textAlign: "center",
          fontSize: "6pt",
          width: "100%",
          wordBreak: "break-all",
          whiteSpace: "normal",
          lineHeight: "1.2",

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
          <span onClick={handleNameClick}>{displayName || "ບໍ່ມີຂໍ້ມູນ"}</span>
        )}
      </div>

      {/* รหัสสินค้า */}
      <div
        style={{
          textAlign: "center",
          fontSize: "5.5pt",
          margin: "1px",
          marginRight: showQR ? "25px" : "0px",
        }}
      >
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
              fontSize: "6pt",
              fontWeight: "bold",
              marginRight: showQR ? "25px" : "0px",
            }}
          >
            ລາຄາ {item.PRICE}
          </div>
        )}

      {/* ✅ QR Code มุมขวาล่าง */}
      {showQR && (
        <div
          style={{
            position: "absolute",
            bottom: "1mm",
            right: "1mm",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "30px",
            height: "19px",
          }}
        >
          <QRCodeSVG
            value={item.BARCODE || item.barcode || item.code || "000000000000"}
            size={128}
            level="Q"
            includeMargin={false}
            style={{
              width: "23px", // ขนาดแสดงจริง
              height: "23px",
              marginRight: "2px",
              shapeRendering: "crispEdges",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarcodeItem;
