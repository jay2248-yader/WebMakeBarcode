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
  zoom
}) => {
  return (
    <div className="flex-1 bg-gray-100 p-8 mt-16 overflow-auto">
      <div 
        className="bg-white p-4 inline-block shadow"
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
        />
      </div>
    </div>
  );
};

export default PreviewPanel;