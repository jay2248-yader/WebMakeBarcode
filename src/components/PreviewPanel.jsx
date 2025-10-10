import React from "react";
import BarcodePreview from "./BarcodePreview";

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
  showQR = false
}) => {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-auto">
      <div className="max-w-full">
        <div 
          className="bg-white p-6 inline-block shadow-xl rounded-2xl border border-gray-200"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
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