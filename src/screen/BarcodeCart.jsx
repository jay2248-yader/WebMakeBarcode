import React, { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import useBarcodeCartStore from "../store/barcodeCartStore";
import PrintSettingsPanel from "../components/PrintSettingsPanel";
import PreviewPanel from "../components/PreviewPanel";
import PrintBarcodeGrid from "../components/PrintBarcodeGrid";
import { 
  createPrintIframe, 
  renderToPrintIframe, 
  printIframe as printIframeUtil, 
  cleanupIframe 
} from "../utils/reactPrintUtils";

const presets = [
  {
    name: "3 x 1 (100×25mm)",
    paperWidth: 100,
    paperHeight: 25,
    labelWidth: 32,
    labelHeight: 25,
    columns: 3,
    rows: 1,
    marginRight: 2,
    marginBottom: 0,
  },
  {
    name: "2 x 5 (A4)",
    paperWidth: 210,
    paperHeight: 297,
    labelWidth: 99,
    labelHeight: 54,
    columns: 2,
    rows: 5,
    marginRight: 3,
    marginBottom: 3,
  },
  {
    name: "3 x 7 (A4 Slim)",
    paperWidth: 210,
    paperHeight: 297,
    labelWidth: 63,
    labelHeight: 38,
    columns: 3,
    rows: 7,
    marginRight: 2,
    marginBottom: 2,
  },
];

const BarcodeCart = () => {
  const barcodes = useBarcodeCartStore((state) => state.barcodes);
  const [isGenerating, setIsGenerating] = useState(false);

  const [paperWidth, setPaperWidth] = useState(100);
  const [paperHeight, setPaperHeight] = useState(25);
  const [labelWidth, setLabelWidth] = useState(32);
  const [labelHeight, setLabelHeight] = useState(25);
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(1);
  const [marginRight, setMarginRight] = useState(2);
  const [marginBottom, setMarginBottom] = useState(0);

  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [lineColor, setLineColor] = useState("#000000");
  const [barcodeWidth, setBarcodeWidth] = useState(2);
  const [barcodeHeight, setBarcodeHeight] = useState(25);

  const [zoom, setZoom] = useState(1);

  const applyPreset = (p) => {
    setPaperWidth(p.paperWidth);
    setPaperHeight(p.paperHeight);
    setLabelWidth(p.labelWidth);
    setLabelHeight(p.labelHeight);
    setColumns(p.columns);
    setRows(p.rows);
    setMarginRight(p.marginRight);
    setMarginBottom(p.marginBottom);
  };

  const handlePrint = async () => {
    if (barcodes.length === 0) {
      alert("ไม่มีบาร์โค้ดในตะกร้า");
      return;
    }

    setIsGenerating(true);

    let iframe = null;

    try {
      // สร้าง iframe สำหรับพิมพ์
      const { iframe: createdIframe } = createPrintIframe(paperWidth, paperHeight);
      iframe = createdIframe;

      // เรนเดอร์ component ลงใน iframe
      await renderToPrintIframe(PrintBarcodeGrid, {
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
      }, iframe);

      // พิมพ์
      await printIframeUtil(iframe);

    } catch (error) {
      console.error('Print error:', error);
      alert('เกิดข้อผิดพลาดในการพิมพ์: ' + error.message);
    } finally {
      // ทำความสะอาด
      if (iframe) {
        cleanupIframe(iframe);
      }
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    // ใช้ฟังก์ชันพิมพ์เดียวกัน แต่ให้ผู้ใช้เลือก "Save as PDF" ใน dialog print
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/80 shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 shadow-inner">
                <FiHelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Barcode Cart</h1>
                <p className="text-sm text-gray-600">จัดการและพิมพ์ label บาร์โค้ด</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <PrintSettingsPanel
        presets={presets}
        applyPreset={applyPreset}
        paperWidth={paperWidth}
        setPaperWidth={setPaperWidth}
        paperHeight={paperHeight}
        setPaperHeight={setPaperHeight}
        labelWidth={labelWidth}
        setLabelWidth={setLabelWidth}
        labelHeight={labelHeight}
        setLabelHeight={setLabelHeight}
        columns={columns}
        setColumns={setColumns}
        rows={rows}
        setRows={setRows}
        marginRight={marginRight}
        setMarginRight={setMarginRight}
        marginBottom={marginBottom}
        setMarginBottom={setMarginBottom}
        barcodeType={barcodeType}
        setBarcodeType={setBarcodeType}
        lineColor={lineColor}
        setLineColor={setLineColor}
        barcodeWidth={barcodeWidth}
        setBarcodeWidth={setBarcodeWidth}
        barcodeHeight={barcodeHeight}
        setBarcodeHeight={setBarcodeHeight}
        zoom={zoom}
        setZoom={setZoom}
        barcodes={barcodes}
        isGenerating={isGenerating}
        handlePrint={handlePrint}
        handleExportPDF={handleExportPDF}
      />

      <PreviewPanel
        barcodes={barcodes}
        labelWidth={labelWidth}
        labelHeight={labelHeight}
        columns={columns}
        rows={rows}
        marginRight={marginRight}
        marginBottom={marginBottom}
        barcodeType={barcodeType}
        lineColor={lineColor}
        barcodeWidth={barcodeWidth}
        barcodeHeight={barcodeHeight}
        paperWidth={paperWidth}
        paperHeight={paperHeight}
        zoom={zoom}
      />

      </div>
    </div>
  );
};

export default BarcodeCart;