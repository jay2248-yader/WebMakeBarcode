import React from "react";

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
  handleExportPDF
}) => {
  return (
    <div className="w-1/3 bg-white shadow-lg p-6 mt-16 space-y-4 overflow-auto h-[calc(100vh-64px)] no-print">
      <h2 className="text-lg font-semibold">Presets</h2>
      <div className="space-y-2">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="w-full border rounded px-3 py-2 hover:bg-gray-50 text-left"
          >
            {p.name}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-4">Paper width (mm)</h2>
      <input
        type="number"
        min={50}
        value={paperWidth}
        onChange={(e) => setPaperWidth(parseInt(e.target.value) || 50)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Paper height (mm)</h2>
      <input
        type="number"
        min={25}
        value={paperHeight}
        onChange={(e) => setPaperHeight(parseInt(e.target.value) || 25)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Label width (mm)</h2>
      <input
        type="number"
        min={10}
        value={labelWidth}
        onChange={(e) => setLabelWidth(parseInt(e.target.value) || 10)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Label height (mm)</h2>
      <input
        type="number"
        min={10}
        value={labelHeight}
        onChange={(e) => setLabelHeight(parseInt(e.target.value) || 10)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Columns</h2>
      <input
        type="number"
        min={1}
        value={columns}
        onChange={(e) => setColumns(parseInt(e.target.value) || 1)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Rows</h2>
      <input
        type="number"
        min={1}
        value={rows}
        onChange={(e) => setRows(parseInt(e.target.value) || 1)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Right margin (mm)</h2>
      <input
        type="number"
        min={0}
        value={marginRight}
        onChange={(e) => setMarginRight(parseInt(e.target.value) || 0)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold">Bottom margin (mm)</h2>
      <input
        type="number"
        min={0}
        value={marginBottom}
        onChange={(e) => setMarginBottom(parseInt(e.target.value) || 0)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold mt-4">Barcode type</h2>
      <select
        value={barcodeType}
        onChange={(e) => setBarcodeType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="CODE128">Code 128</option>
        <option value="CODE39">Code 39</option>
        <option value="EAN13">EAN-13</option>
        <option value="UPC">UPC</option>
        <option value="ITF14">ITF-14</option>
      </select>

      <h2 className="text-lg font-semibold mt-4">Line color</h2>
      <input
        type="color"
        value={lineColor}
        onChange={(e) => setLineColor(e.target.value)}
        className="w-24 h-10 p-1 border rounded"
      />

      <h2 className="text-lg font-semibold mt-4">Barcode width</h2>
      <input
        type="number"
        min={1}
        max={4}
        step={0.1}
        value={barcodeWidth}
        onChange={(e) => setBarcodeWidth(parseFloat(e.target.value) || 1)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold mt-4">Barcode height</h2>
      <input
        type="number"
        min={10}
        value={barcodeHeight}
        onChange={(e) => setBarcodeHeight(parseInt(e.target.value) || 10)}
        className="w-24 p-2 border rounded"
      />

      <h2 className="text-lg font-semibold mt-4">Preview zoom</h2>
      <input
        type="range"
        min={0.6}
        max={2}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(parseFloat(e.target.value))}
        className="w-full"
      />

      <div className="text-sm text-gray-600 mt-2">
        Items: {barcodes.length} | Per page: {columns * rows} | Pages: {Math.ceil(barcodes.length / (columns * rows))}
      </div>

      <div className="flex space-x-2 mt-6">
        <button
          onClick={handlePrint}
          disabled={isGenerating || barcodes.length === 0}
          className={`flex-1 py-2 rounded no-print ${
            isGenerating || barcodes.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isGenerating ? 'กำลังสร้าง...' : 'พิมพ์'}
        </button>
        
        <button
          onClick={handleExportPDF}
          disabled={isGenerating || barcodes.length === 0}
          className={`flex-1 py-2 rounded no-print ${
            isGenerating || barcodes.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isGenerating ? 'กำลังสร้าง...' : 'ส่งออก PDF'}
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