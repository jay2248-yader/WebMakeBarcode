import React, { useEffect, useState } from "react";
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
  showQR,
  setShowQR,
}) => {
  const { clearCart } = useBarcodeCartStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [customPresets, setCustomPresets] = useState([]);
  const [presetName, setPresetName] = useState("");
  const [showDeletePresetModal, setShowDeletePresetModal] = useState(false);
  const [presetPendingDelete, setPresetPendingDelete] = useState(null);
  const [openPaper, setOpenPaper] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [showSavePresetModal, setShowSavePresetModal] = useState(false);

  // ฟังก์ชันช่วย parse number และรองรับค่า 0
  const parseOrDefault = (val, defaultVal) => {
    const num = parseFloat(val);
    return isNaN(num) ? defaultVal : num;
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // load custom presets from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("barcode_presets");
      const stored = raw ? JSON.parse(raw) : [];
      // Merge built-in presets into custom list (unique by name)
      const combined = [...presets, ...stored].reduce((acc, p) => {
        if (!acc.some((x) => x.name === p.name)) acc.push(p);
        return acc;
      }, []);
      setCustomPresets(combined);
      localStorage.setItem("barcode_presets", JSON.stringify(combined));
    } catch (err) {
      console.warn("Failed to load presets", err);
    }
  }, [presets]);

  const persistCustomPresets = (list) => {
    try {
      localStorage.setItem("barcode_presets", JSON.stringify(list));
    } catch (err) {
      console.warn("Failed to save presets", err);
    }
  };

  const handleSavePreset = () => {
    const name = presetName.trim();
    if (!name) return;
    const newPreset = {
      name,
      paperWidth,
      paperHeight,
      labelWidth,
      labelHeight,
      columns,
      rows,
      marginRight,
      marginBottom,
    };
    const next = [...customPresets.filter((p) => p.name !== name), newPreset];
    setCustomPresets(next);
    persistCustomPresets(next);
  };

  const handleDeletePreset = (name) => {
    const next = customPresets.filter((p) => p.name !== name);
    setCustomPresets(next);
    persistCustomPresets(next);
  };

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
        {/* Presets moved into My Presets */}

        {/* Custom Presets */}
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-semibold text-gray-700">My Presets</h3>
          {customPresets.length === 0 ? (
            <div className="text-xs text-gray-500">No custom presets</div>
          ) : (
            customPresets.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <button
                  onClick={() => applyPreset(p)}
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:bg-indigo-50 hover:border-indigo-300 text-left transition-all duration-200 shadow-sm"
                >
                  <span className="font-medium text-gray-800">{p.name}</span>
                </button>
                <button
                  onClick={() => { setPresetPendingDelete(p); setShowDeletePresetModal(true); }}
                  className="px-3 py-2 rounded-lg border text-red-600 border-red-500 hover:bg-red-100"
                  aria-label={`Delete preset ${p.name}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={() => {
                if (presetName.trim()) {
                  setShowSavePresetModal(true);
                }
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
            >
              ບັນທຶກ
            </button>
          </div>
        </div>

        {showDeletePresetModal && (
          <ConfirmModal
            title={`ຕ້ອງການລົບ Preset "${presetPendingDelete?.name}" ຫຼືບໍ່?`}
            onConfirm={() => {
              if (presetPendingDelete?.name) {
                handleDeletePreset(presetPendingDelete.name);
              }
              setShowDeletePresetModal(false);
              setPresetPendingDelete(null);
            }}
            onCancel={() => {
              setShowDeletePresetModal(false);
              setPresetPendingDelete(null);
            }}
          />
        )}

        {showSavePresetModal && (
          <ConfirmModal
            title={`ຢືນຢັນການບັນທຶກ Preset: "${presetName.trim()}"`}
            onConfirm={() => {
              handleSavePreset();
              setShowSavePresetModal(false);
            }}
            onCancel={() => setShowSavePresetModal(false)}
          >
            <div className="space-y-1">
              <div><span className="font-medium">Paper</span>: {paperWidth} × {paperHeight} mm</div>
              <div><span className="font-medium">Label</span>: {labelWidth} × {labelHeight} mm</div>
              <div><span className="font-medium">Grid</span>: {columns} cols × {rows} rows</div>
              <div><span className="font-medium">Margin</span>: Right {marginRight}, Bottom {marginBottom} mm</div>
              <div><span className="font-medium">Barcode Type</span>: {barcodeType}</div>
              <div><span className="font-medium">Line Color</span>: <span className="inline-block align-middle w-3 h-3 rounded-sm border" style={{ backgroundColor: lineColor }} /> <span className="ml-1">{lineColor}</span></div>
              <div><span className="font-medium">Line Width</span>: {barcodeWidth}</div>
              <div><span className="font-medium">Height</span>: {barcodeHeight}</div>
              <div><span className="font-medium">Show QR</span>: {showQR ? "Yes" : "No"}</div>
            </div>
          </ConfirmModal>
        )}

        {/* Paper Settings */}
        <div className="space-y-4 mt-6">
          <h2
            onClick={() => setOpenPaper(!openPaper)
            }
            className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3 cursor-pointer select-none"
            aria-expanded={openPaper}
          >
            <span className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 shadow-inner">
              📏
            </span>
            <span>Paper Settings</span>
            <span className="ml-auto text-gray-500">{openPaper ? "▲" : "▼"}</span>
          </h2>
          {openPaper && (
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
          )}
        </div>

        {/* Label Settings */}
        <div className="space-y-4 mt-6">
          <h2
            onClick={() => setOpenLabel(!openLabel)}
            className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3 cursor-pointer select-none"
            aria-expanded={openLabel}
          >
            <span className="p-2 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600 shadow-inner">
              🏷️
            </span>
            <span>Label Settings</span>
            <span className="ml-auto text-gray-500">{openLabel ? "▲" : "▼"}</span>
          </h2>
          {openLabel && (
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
          )}
        </div>

        {/* Barcode Settings */}
        <div className="space-y-4 mt-6">
          <h2
            onClick={() => setOpenBarcode(!openBarcode)}
            className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3 cursor-pointer select-none"
            aria-expanded={openBarcode}
          >
            <span className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 shadow-inner">
              📊
            </span>
            <span>Barcode Settings</span>
            <span className="ml-auto text-gray-500">{openBarcode ? "▲" : "▼"}</span>
          </h2>
          {openBarcode && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                id="toggle-show-qr"
                type="checkbox"
                checked={!!showQR}
                onChange={(e) => setShowQR(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="toggle-show-qr" className="text-sm font-medium text-gray-700">
                Show QR on label
              </label>
            </div>
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
          )}
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
