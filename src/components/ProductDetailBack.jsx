import React, { useState } from "react";
import {
  FaBarcode,
  FaFileInvoice,
  FaBalanceScale,
  FaWarehouse,
  FaTag,
} from "react-icons/fa";
import Barcode from "react-barcode";

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
      <p className="text-base font-semibold text-gray-900">
        {value ?? "ບໍ່ມີຂໍ້ມູນ"}
      </p>
    </div>
  </div>
);

const ProductDetailBack = ({ barcodeData, addToCart }) => {
  const [quantity, setQuantity] = useState(1); // จำนวนที่จะเพิ่ม

  const barcodeList = Array.isArray(barcodeData)
    ? barcodeData
    : barcodeData?.data_id?.products || [];
  const product = barcodeList[0]?.product || {};

  if (!barcodeList.length) {
    return (
      <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-8 w-full max-w-3xl mx-auto border border-gray-100">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Barcode Data Available
          </h2>
          <p className="text-gray-500">ບໍ່ມີຂໍ້ມູນ Barcode ສຳລັບການແສດງຜົນ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-8 w-full max-w-3xl mx-auto border border-gray-100">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {product?.NAMETH || "Unknown Product"}
          </h2>
          <p className="text-2xl text-black mt-1 border border-gray-300 rounded-lg px-3 py-1 inline-block bg-sky-400 shadow-sm">
            {product?.CODE || "N/A"}
          </p>
        </div>
      </div>

      {/* Product Groups */}
      <div>
        <SectionTitle icon={<FaTag />} title="Product Groups" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderInfoItem(null, "Main Group", product?.MAINGROUP)}
          {renderInfoItem(null, "Subgroup 1", product?.SUBGROUP1)}
          {renderInfoItem(null, "Subgroup 2", product?.SUBGROUP2)}
        </div>
      </div>

      {/* Location & Units */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaWarehouse />} title="Location & Units" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInfoItem(
            <FaWarehouse className="text-lg text-orange-600" />,
            "Warehouse / Location",
            `${product?.GRWAREHOUSE || "N/A"} / ${product?.GRLOCATION || "N/A"}`
          )}
          {renderInfoItem(
            <FaBalanceScale className="text-lg text-purple-600" />,
            "Stock Unit / Sale Unit",
            `${product?.STOCKUNIT || "N/A"} / ${product?.SALEUNIT || "N/A"}`
          )}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="Quantity" />
        <div className="flex items-center space-x-4 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
          <label className="text-sm font-medium text-gray-700">ຈຳນວນ:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600"></span>
        </div>
      </div>

      {/* Barcodes */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaBarcode />} title="Barcodes" />
        <div className="space-y-4 max-h-[50vh] overflow-y-auto px-1">
          {barcodeList.map((bc, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <div>
                <p className="font-mono font-semibold text-lg text-gray-800">
                  {bc.BARCODE || "N/A"}
                </p>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      ...bc,
                      NAME: product?.NAMETH,
                      CODE: product?.CODE,
                      PRICE: "ບໍ່ມີລາຄາ",
                    });
                  }
                  setQuantity(1);
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition h-min self-center"
                title="ເພີ່ມໂດຍບໍ່ມີລາຄາ - ສາມາດແກ້ໄຂລາຄາພາຍໃນ"
              >
                ➕ Add {quantity} (No Price)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBack;
