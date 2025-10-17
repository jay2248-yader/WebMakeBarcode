import React from "react";
import BarcodePreview from "./BarcodePreview";
import AlertIcon from "../assets/alert-svgrepo.svg"; // ใช้ไอคอนแดง

const PreviewPanel = ({
  barcodes,
  labelWidth,
  labelHeight,
  columns,
  rows,
  marginRight,
  marginBottom,
  barcodeType,
  lineColor,
  barcodeWidth,
  barcodeHeight,
  paperWidth,
  paperHeight,
  zoom,
  showQR = false,
}) => {
  if (!barcodes || barcodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-full max-w-md bg-white/90 border border-red-400 shadow-xl rounded-2xl p-6 text-center">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <img src={AlertIcon} alt="Alert" className="w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold text-black">ບໍ່ພົບບາໂຄດ</h3>
          <p className="mt-2 text-gray-700">ກະລຸນາໄປເພີ່ມບາໂຄດກ່ອນ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-5 overflow-auto -mt-5 flex items-start justify-center">
      <div className="max-w-full">
        <div
          className="bg-white p-6 inline-block shadow-xl rounded-2xl border border-gray-200"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
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
            showQR={showQR}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
