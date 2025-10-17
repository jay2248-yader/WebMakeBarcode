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

  const [zoom, setZoom] = useState(2);
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

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { clearCart } = useBarcodeCartStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Floating Action Buttons - ปุ่มลอยด้านขวาล่าง (ซ่อนเมื่อเปิด panel) */}
      {!isPanelOpen && (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
          {/* ปุ่มพิมพ์ */}
          <button
          onClick={handlePrint}
          disabled={isGenerating || barcodes.length === 0}
          className={`
            group relative
            px-8 py-4 rounded-xl font-semibold
            shadow-lg hover:shadow-2xl
            transition-all duration-200
            flex items-center gap-3
            ${
              isGenerating || barcodes.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105 active:scale-95"
            }
          `}
          title="ພິມບາໂຄດ"
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
            />
          </svg>
          <span>{isGenerating ? "ກຳລັງສ້າງ..." : "ພິມ"}</span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            ພິມບາໂຄດທັງໝົດ
          </span>
        </button>

        {/* ปุ่มลบทั้งหมด */}
        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={barcodes.length === 0 || isGenerating}
          className={`
            group relative
            px-8 py-4 rounded-xl font-semibold
            shadow-lg hover:shadow-2xl
            transition-all duration-200
            flex items-center gap-2
            ${
              barcodes.length === 0 || isGenerating
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105 active:scale-95"
            }
          `}
          title="ລົບບາໂຄດທັງໝົດ"
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
          <span>ລົບທັງໝົດ</span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            ລົບບາໂຄດທັງໝົດ
          </span>
        </button>
        </div>
      )}

      {/* Confirm Modal สำหรับลบทั้งหมด */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ຢືນຢັນການລົບ
            </h3>
            <p className="text-gray-600 mb-6">
              ທ່ານແນ່ໃຈວ່າຕ້ອງການລົບບາໂຄດທັງໝົດ ({barcodes.length} ລາຍການ) ຫຼືບໍ່?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                ຍົກເລີກ
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowConfirmModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                ລົບທັງໝົດ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PrintSettingsPanel จะเป็น fixed overlay ไม่ต้องอยู่ใน flex */}
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
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />

      {/* PreviewPanel - อยู่ตรงกลางเมื่อปิด panel, เลื่อนไปทางซ้ายเมื่อเปิด panel บน desktop */}
      <div
        className={`
          min-h-screen
          transition-all duration-300 ease-in-out
          ${isPanelOpen ? "md:ml-[400px] lg:ml-[450px]" : "ml-0"}
        `}
      >
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