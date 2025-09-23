// src/components/ProductDetailCard.jsx
import React, { useState } from "react";
import {
  FaBarcode,
  FaWarehouse,
  FaFileInvoice,
  FaBalanceScale,
  FaTag,
} from "react-icons/fa";
import BarcodeDisplay from "./BarcodeDisplay"; // import component

const ProductDetailCard = ({ priceData }) => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  const {
    SALEPRICE1,
    SALEPRICE2,
    SALEPRICE3,
    SALEPRICE4,
    DOCNO,
    UNITCODE,
    productbarcode,
  } = priceData;

  const product = productbarcode?.product || {};
  const barcodes = productbarcode
    ? Array.isArray(productbarcode)
      ? productbarcode
      : [productbarcode]
    : [];

  const SectionTitle = ({ icon, title }) => (
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
      <span className="p-2 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 shadow-inner">
        {icon}
      </span>
      <span>{title}</span>
    </h3>
  );

  const renderInfoItem = (icon, title, value) => (
    <div className="flex items-center space-x-4">
      <span className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 shadow-inner">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-base font-semibold text-gray-900">{value || "ບໍ່ມີຂໍ້ມູນ"}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-8 mb-8 w-full max-w-3xl mx-auto border border-gray-100 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gradient-to-r from-transparent via-gray-200 to-transparent">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {product.NAMETH || "ບໍ່ມີຂໍ້ມູນ"}
            </h2>
            <p className="text-2xl text-black mt-1 border border-gray-300 rounded-lg px-3 py-1 inline-block bg-sky-400 shadow-sm">
              {product.CODE || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
          {renderInfoItem(<FaFileInvoice className="text-lg text-blue-600" />, "Document No", DOCNO)}
          {renderInfoItem(<FaBalanceScale className="text-lg text-purple-600" />, "Unit", UNITCODE)}
        </div>

        {/* Pricing */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <SectionTitle icon={<FaTag />} title="Pricing" />
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            {[SALEPRICE1, SALEPRICE2, SALEPRICE3, SALEPRICE4].map((price, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center shadow hover:shadow-lg transition"
              >
                <p className="font-semibold text-sm text-gray-600">Price {index + 1}</p>
                <p className="text-green-700 font-black text-2xl mt-2">{price || "ບໍ່ມີຂໍ້ມູນ"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Groups */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <SectionTitle icon={<FaTag />} title="Product Groups" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-sm text-gray-500">Main Group</p>
              <p className="text-gray-800 font-medium mt-1">{product.MAINGROUP || "ບໍ່ມີຂໍ້ມູນ"}</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-500">Subgroup 1</p>
              <p className="text-gray-800 font-medium mt-1">{product.SUBGROUP1 || "ບໍ່ມີຂໍ້ມູນ"}</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-500">Subgroup 2</p>
              <p className="text-gray-800 font-medium mt-1">{product.SUBGROUP2 || "ບໍ່ມີຂໍ້ມູນ"}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <SectionTitle icon={<FaWarehouse />} title="Location" />
          {renderInfoItem(
            <FaWarehouse className="text-lg text-orange-600" />,
            "Warehouse / Location",
            `${product.GRWAREHOUSE || "ບໍ່ມີຂໍ້ມູນ"} / ${product.GRLOCATION || "ບໍ່ມີຂໍ້ມູນ"}`
          )}
        </div>

        {/* Barcodes */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <SectionTitle icon={<FaBarcode />} title="Barcodes" />
          <div className="space-y-4">
            {barcodes.length > 0 ? (
              <button
                onClick={() => setShowBarcodeModal(true)}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 text-gray-800 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm hover:shadow-md transition"
              >
                <span className="font-mono text-base font-semibold">
                  {barcodes.length} Barcode(s) available
                </span>
                <span className="text-gray-500 text-xs md:text-sm mt-2 sm:mt-0">Click to view</span>
              </button>
            ) : (
              <p className="text-gray-500">ບໍ່ມີຂໍ້ມູນ Barcode</p>
            )}
          </div>
        </div>
      </div>

      {/* Barcode Modal */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full relative shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setShowBarcodeModal(false)}
            >
              ✕
            </button>
            <BarcodeDisplay barcodes={barcodes} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailCard;
