// pages/BarcodeCart.jsx
import React, { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import useBarcodeCartStore from "../store/barcodeCartStore";
import BarcodePreview from "../components/BarcodePreview";

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

  const [paperWidth, setPaperWidth] = useState(100);
  const [paperHeight, setPaperHeight] = useState(25);
  const [labelWidth, setLabelWidth] = useState(32);
  const [labelHeight, setLabelHeight] = useState(25);
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(1);
  const [marginRight, setMarginRight] = useState(2);
  const [marginBottom, setMarginBottom] = useState(0);

  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [lineColor, setLineColor] = useState("#000");
  const [barcodeWidth, setBarcodeWidth] = useState(2);
  const [barcodeHeight, setBarcodeHeight] = useState(25);

  const [zoom, setZoom] = useState(1); // พรีวิวเท่านั้น

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

  const handlePrint = () => {
    const printArea = document.getElementById("print-area");
    if (!printArea) return;

    // Create hidden iframe to print without opening a new tab/window
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "-10000px";
    iframe.style.bottom = "-10000px";
    iframe.width = "0";
    iframe.height = "0";
    iframe.srcdoc = ""; // required for Safari to initialize the document
    document.body.appendChild(iframe);

    const style = `
      <style>
        @page { size: ${paperWidth}mm ${paperHeight}mm; margin: 0; }
        html, body { height: 100%; }
        body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        #print-area { transform: none !important; }
        .label { page-break-inside: avoid; }
      </style>
    `;

    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(`<!doctype html><html><head><meta charset="utf-8" />${style}</head><body>${printArea.outerHTML}</body></html>`);
    doc.close();

    const doPrint = () => {
      const win = iframe.contentWindow;
      if (!win) return;
      win.focus();
      win.print();
      // Cleanup after print
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
    };

    // Wait a tick for layout to finish before printing
    setTimeout(doPrint, 100);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
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
          onChange={(e) => setPaperWidth(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Paper height (mm)</h2>
        <input
          type="number"
          min={25}
          value={paperHeight}
          onChange={(e) => setPaperHeight(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Label width (mm)</h2>
        <input
          type="number"
          min={10}
          value={labelWidth}
          onChange={(e) => setLabelWidth(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Label height (mm)</h2>
        <input
          type="number"
          min={10}
          value={labelHeight}
          onChange={(e) => setLabelHeight(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Columns</h2>
        <input
          type="number"
          min={1}
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Rows</h2>
        <input
          type="number"
          min={1}
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Right margin (mm)</h2>
        <input
          type="number"
          min={0}
          value={marginRight}
          onChange={(e) => setMarginRight(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold">Bottom margin (mm)</h2>
        <input
          type="number"
          min={0}
          value={marginBottom}
          onChange={(e) => setMarginBottom(parseInt(e.target.value))}
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
          value={barcodeWidth}
          onChange={(e) => setBarcodeWidth(parseInt(e.target.value))}
          className="w-24 p-2 border rounded"
        />

        <h2 className="text-lg font-semibold mt-4">Barcode height</h2>
        <input
          type="number"
          min={10}
          value={barcodeHeight}
          onChange={(e) => setBarcodeHeight(parseInt(e.target.value))}
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

        <button
          onClick={handlePrint}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 no-print"
        >
          พิมพ์ / ส่งออก PDF
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-gray-100 p-8 mt-16 overflow-auto">
        <style>
          {`
    @page {
      size: ${paperWidth}mm ${paperHeight}mm;
      margin: 0;
    }
    @media print {
      .no-print { display: none !important; }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: white;
      }
      #print-area {
        transform: none !important;
      }
      .label { page-break-inside: avoid; }
    }
  `}
        </style>

        <div className="bg-white p-4 inline-block shadow">
          <BarcodePreview
            currentBarcodes={barcodes}
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
          />
        </div>
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center space-x-2 no-print">
        <FiHelpCircle className="w-5 h-5" />
        <span>Help</span>
      </button>
    </div>
  );
};

export default BarcodeCart;
