import React from "react";
import JsBarcode from "jsbarcode";

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
        JsBarcode(canvasRef.current, item.BARCODE || item.barcode || item.code || "", {
          format: barcodeType,
          width: barcodeWidth,
          height: barcodeHeight,
          displayValue: false,
          margin: 0,
          background: "#ffffff",
          lineColor: lineColor,
          valid: function(valid) {
            if (!valid) {
              console.warn("Invalid barcode");
            }
          }
        });
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
        padding: "2mm",
        boxSizing: "border-box",
        background: "#fff",
        fontFamily: "'Noto Sans Lao', sans-serif",
        fontSize: "12pt",
      }}
    >
      {/* รหัสสินค้า - ตัวใหญ่กลาง */}
      <div
        style={{
          textAlign: "center",
          fontSize: "8pt",
          fontWeight: "bold",
          marginTop:"-5px",
          letterSpacing: "0.5px",
        }}
      >
        {item.BARCODE || item.barcode || item.code || "H0010890"}
      </div>

      {/* ระดับพื้นที่ หน้าแพทย์ */}
      <div
        style={{
          textAlign: "center",
          fontSize: "7pt",
        
        }}
      >
        ລະຫັດສິນຄ້າ
      </div>

      {/* ข้อมูลในวงเล็บ */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1mm",
          fontSize: "7pt",
        }}
      >
        (IP)สูงกึ่งบนงาน  18 สิ้น/สูง
      </div>

      {/* พื้นที่บาร์โค้ด */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas 
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
          }}
        />
      </div>

      {/* ราคา */}
      <div
        style={{
          textAlign: "center",
          fontSize: "8pt",
          fontWeight: "bold",
        }}
      >
        ລາຄາ {item.price ? `${parseFloat(item.price).toLocaleString('th-TH')} KIP` : "1,890.900 KIP"}
      </div>
    </div>
  );
};

export default BarcodeItem;