import React from "react";
import useBarcodeCartStore from "../store/barcodeCartStore";

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

  return (
    <div className="w-1/3 backdrop-blur-lg bg-white/90 shadow-xl border-r border-gray-200/50 p-6 space-y-6 overflow-auto h-screen no-print">
      <div className="pt-4">

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
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
          <span className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-inner">
            📏
          </span>
          <span>ຕັ້ງຄ່າໜ້າເຈ້ຍ</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Width (mm)</label>
            <input
              type="number"
              min={50}
              value={paperWidth}
              onChange={(e) => setPaperWidth(parseInt(e.target.value) || 50)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (mm)</label>
            <input
              type="number"
              min={25}
              value={paperHeight}
              onChange={(e) => setPaperHeight(parseInt(e.target.value) || 25)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
          <span className="p-2 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600 shadow-inner">
            🏷️
          </span>
          <span>Label Settings</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Width (mm)</label>
            <input
              type="number"
              min={10}
              value={labelWidth}
              onChange={(e) => setLabelWidth(parseInt(e.target.value) || 10)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (mm)</label>
            <input
              type="number"
              min={10}
              value={labelHeight}
              onChange={(e) => setLabelHeight(parseInt(e.target.value) || 10)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
            <input
              type="number"
              min={1}
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value) || 1)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rows</label>
            <input
              type="number"
              min={1}
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 1)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Right Margin</label>
            <input
              type="number"
              min={0}
              value={marginRight}
              onChange={(e) => setMarginRight(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bottom Margin</label>
            <input
              type="number"
              min={0}
              value={marginBottom}
              onChange={(e) => setMarginBottom(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
          <span className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 shadow-inner">
            📊
          </span>
          <span>Barcode Settings</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Type</label>
            <select
              value={barcodeType}
              onChange={(e) => setBarcodeType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
            >
              <option value="CODE128">Code 128</option>
              <option value="CODE39">Code 39</option>
              <option value="EAN13">EAN-13</option>
              <option value="UPC">UPC</option>
              <option value="ITF14">ITF-14</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Line Color</label>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className="w-full h-12 p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="number"
                min={1}
                max={4}
                step={0.1}
                value={barcodeWidth}
                onChange={(e) => setBarcodeWidth(parseFloat(e.target.value) || 1)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <input
              type="number"
              min={10}
              value={barcodeHeight}
              onChange={(e) => setBarcodeHeight(parseInt(e.target.value) || 10)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview Zoom: {zoom}x</label>
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



      <div className="space-y-3">
        <div className="grid ">
          <button
            onClick={handlePrint}
            disabled={isGenerating || barcodes.length === 0}
            className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 no-print ${
              isGenerating || barcodes.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
            }`}
          >
            {isGenerating ? '🔄 ກຳລັງສ້າງ...' : '🖨️    PRINT'}
          </button>
        </div>

        <button
          onClick={() => {
            if (confirm('ຕ້ອງການລົບ Barcode  ທັງໝົດຫຼືບໍ່?')) {
              clearCart();
            }
          }}
          disabled={barcodes.length === 0}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 no-print ${
            barcodes.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
          }`}
        >
          🗑️ ລົບທັງໝົດ
        </button>
      </div>

      {isGenerating && (
        <div className="text-center text-blue-600 text-sm mt-2">
          กรุณารอสักครู่... กำลังสร้างบาร์โค้ดความละเอียดสูง
        </div>
      )}
    </div>
  );
};

export default PrintSettingsPanel;