import React from "react";
import JsBarcode from "jsbarcode";
import CSCLogo from "../assets/CSCLogo.webp"; // ✅ import โลโก้

const BarcodeItem = ({
  item,
  barcodeType,
  lineColor,
  barcodeWidth,
  barcodeHeight,
  labelWidth,
  labelHeight,
}) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
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
            margin: 0,
            background: "#ffffff",
            lineColor: lineColor,
            valid: function (valid) {
              if (!valid) {
                console.warn("Invalid barcode");
              }
            },
          }
        );
      } catch (error) {
        console.error("Barcode generation error:", error);
      }
    }
  }, [item, barcodeType, lineColor, barcodeWidth, barcodeHeight]);

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
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
  
        }}
      >
        {/* โลโก้ซ้ายสุด */}
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

        {/* รหัสสินค้า (ตัวใหญ่กลาง) */}
        <div
          style={{
            fontSize: "7pt",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            textAlign: "center",
            width: "100%", // ให้ text กึ่งกลางเสมอ
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
          margin: "1px 0 3px 0",
          flex: "0 0 auto",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
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
          marginTop: "1px",
        }}
      >
        {item.NAME || item.NAMETH || "ບໍ່ມີຂໍ້ມູນ"}
      </div>

      {/* รหัสสินค้า (CODE) */}
      <div
        style={{
          textAlign: "center",
          fontSize: "6pt",
        }}
      >
        {item.CODE ? `ລະຫັດສິນຄ້າ (${item.CODE})` : ""}
      </div>

      {/* ราคา */}
      {item.PRICE &&
        item.PRICE !== "ไม่มีราคา" &&
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
