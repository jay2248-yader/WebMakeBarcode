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
    labelWidth: 31,
    labelHeight: 24,
    columns: 3,
    rows: 1,
    marginRight: 3,
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
  const [labelWidth, setLabelWidth] = useState(31);
  const [labelHeight, setLabelHeight] = useState(24);
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(1);
  const [marginRight, setMarginRight] = useState(3);
  const [marginBottom, setMarginBottom] = useState(0);

  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [lineColor, setLineColor] = useState("#000000");
  const [barcodeWidth, setBarcodeWidth] = useState(1);
  const [barcodeHeight, setBarcodeHeight] = useState(26);

  const [zoom, setZoom] = useState(1.3);
  const [showQR, setShowQR] = useState(false);

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
      alert("ບໍ່ມີບາລ໌ໂຄດໃນກະຕ່າ");
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
        paperHeight,
        showQR
      }, iframe);

      // พิมพ์
      await printIframeUtil(iframe);

    } catch (error) {
      console.error('Print error:', error);
      alert('ເກີດຂໍ້ຜິດພາດໃນການພິມ: ' + error.message);
    } finally {
      // ทำความสะอาด
      if (iframe) {
        cleanupIframe(iframe);
      }
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
     

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
        showQR={showQR}
        setShowQR={setShowQR}
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
        showQR={showQR}
      />

      </div>
    </div>
  );
};

export default BarcodeCart;