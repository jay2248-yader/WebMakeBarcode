import React, { useState } from "react";
import useBarcodeCartStore from "../store/barcodeCartStore";
import ConfirmModal from "./ConfirmModal";

const PrintSettingsPanel = ({
  presets,
  applyPreset,
  paperWidth,
  setPaperWidth,
  paperHeight,
  setPaperHeight,
  labelWidth,
  setLabelWidth,
  labelHeight,
  setLabelHeight,
  columns,
  setColumns,
  rows,
  setRows,
  marginRight,
  setMarginRight,
  marginBottom,
  setMarginBottom,
  barcodeType,
  setBarcodeType,
  lineColor,
  setLineColor,
  barcodeWidth,
  setBarcodeWidth,
  barcodeHeight,
  setBarcodeHeight,
  zoom,
  setZoom,
  barcodes,
  isGenerating,
  handlePrint,
}) => {
  const { clearCart } = useBarcodeCartStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // ฟังก์ชันช่วย parse number และรองรับค่า 0
  const parseOrDefault = (val, defaultVal) => {
    const num = parseFloat(val);
    return isNaN(num) ? defaultVal : num;
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* ปุ่ม mobile toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-indigo-500 text-white rounded-full shadow-lg"
        >
          ☰
        </button>
      </div>

      {/* Panel */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white/90 backdrop-blur-lg shadow-xl border-r border-gray-200/50 p-6 overflow-auto
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-1/3
        `}
      >
        {/* Presets */}
        <div className="space-y-3">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl px-4 py-3 hover:from-indigo-50 hover:to-indigo-100 hover:border-indigo-300 text-left transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="font-medium text-gray-800">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Paper Settings */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
            <span className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-inner">
              📏
            </span>
            <span>Paper Settings</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (mm)
              </label>
              <input
                type="number"
                min={0}
                value={paperWidth}
                onChange={(e) =>
                  setPaperWidth(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (mm)
              </label>
              <input
                type="number"
                min={0}
                value={paperHeight}
                onChange={(e) =>
                  setPaperHeight(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Label Settings */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
            <span className="p-2 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600 shadow-inner">
              🏷️
            </span>
            <span>Label Settings</span>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (mm)
              </label>
              <input
                type="number"
                min={0}
                value={labelWidth}
                onChange={(e) =>
                  setLabelWidth(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (mm)
              </label>
              <input
                type="number"
                min={0}
                value={labelHeight}
                onChange={(e) =>
                  setLabelHeight(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Columns
              </label>
              <input
                type="number"
                min={0}
                value={columns}
                onChange={(e) => setColumns(parseOrDefault(e.target.value, 0))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rows
              </label>
              <input
                type="number"
                min={0}
                value={rows}
                onChange={(e) => setRows(parseOrDefault(e.target.value, 0))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Right Margin
              </label>
              <input
                type="number"
                min={0}
                value={marginRight}
                onChange={(e) =>
                  setMarginRight(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bottom Margin
              </label>
              <input
                type="number"
                min={0}
                value={marginBottom}
                onChange={(e) =>
                  setMarginBottom(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Barcode Settings */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
            <span className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 shadow-inner">
              📊
            </span>
            <span>Barcode Settings</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode Type
              </label>
              <select
                value={barcodeType}
                onChange={(e) => setBarcodeType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
              >
                <option value="CODE128">Code 128</option>
                <option value="CODE39">Code 39</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Color
                </label>
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className="w-full h-12 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width
                </label>
                <input
                  type="number"
                  min={0}
                  max={4}
                  step={0.1}
                  value={barcodeWidth}
                  onChange={(e) =>
                    setBarcodeWidth(parseOrDefault(e.target.value, 0))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <input
                type="number"
                min={0}
                value={barcodeHeight}
                onChange={(e) =>
                  setBarcodeHeight(parseOrDefault(e.target.value, 0))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview Zoom: {zoom}x
              </label>
              <input
                type="range"
                min={0.6}
                max={2}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <div className="grid">
            <button
              onClick={handlePrint}
              disabled={isGenerating || barcodes.length === 0}
              className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 no-print ${
                isGenerating || barcodes.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
              }`}
            >
              {isGenerating ? "🔄 ກຳລັງສ້າງ..." : "🖨️ PRINT"}
            </button>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={barcodes.length === 0 || isGenerating} // ✅ ปิดปุ่มเมื่อกำลังพิมพ์หรือไม่มีบาร์โค้ด
            className={`
    w-full py-3 px-4 rounded-xl font-medium transition-all duration-500 ease-in-out
    no-print transform
    ${
      barcodes.length === 0 || isGenerating
        ? "bg-gray-300 text-gray-500 cursor-not-allowed scale-95 opacity-80"
        : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:from-red-600 hover:to-red-700"
    }
  `}
          >
            🗑️ ລົບທັງໝົດ
          </button>
          
        </div>

        {isGenerating && (
          <div className="text-center text-blue-600 text-sm mt-2">
            ກະລຸນາລໍຖ້າ... ກຳລັງສ້າງບາໂຄດ
          </div>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmModal
          title="ຕ້ອງການລົບ Barcode ທັງໝົດຫຼືບໍ່?"
          onConfirm={() => {
            clearCart();
            setShowConfirmModal(false);
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default PrintSettingsPanel;
