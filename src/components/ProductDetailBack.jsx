import React, { useState } from "react";
import {
  FaBarcode,
  FaFileInvoice,
  FaBalanceScale,
  FaWarehouse,
  FaTag,
} from "react-icons/fa";

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
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = (bc) => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...bc,
        NAME: product?.NAMETH,
        CODE: product?.CODE,
        PRICE: "ບໍ່ມີລາຄາ",
      });
    }
    setQuantity(1);
  };

  return (
    <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-8 w-full max-w-3xl mx-auto border border-gray-100">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {product?.NAMETH || "Unknown Product"}
          </h2>
          <p className="text-2xl text-white mt-1 border border-gray-300 rounded-lg px-3 py-1 inline-block bg-blue-500 shadow-sm">
            {product?.CODE || "N/A"}
          </p>
        </div>
      </div>

      {/* Barcodes Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-inner">
        {barcodeList && barcodeList.length > 0 ? (
          <div className="space-y-4">
            {barcodeList.map((bc, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                {/* Section Title with Barcode Text on the same line */}
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 shadow-inner">
                      <FaBarcode />
                    </span>
                    <span className="text-xl font-bold text-gray-800">Barcodes</span>
                  </div>
                  <p className="font-mono text-lg font-semibold text-gray-800 ml-3 mt-1">
                    {bc.BARCODE || "N/A"}
                  </p>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-200 my-2" />

                {/* Quantity Input + Add Button on same row */}
                <div className="flex justify-center items-center gap-2 mt-2 flex-wrap">
                  <label className="text-sm font-medium text-gray-700">
                    ຈຳນວນ:
                  </label>
                  <div className="flex items-center space-x-1">
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
                      className="w-12 text-center border border-gray-300 rounded-lg py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button beside quantity */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(bc);
                    }}
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                    title="ເພີ່ມໂດຍບໍ່ມີລາຄາ - ສາມາດແກ້ໄຂລາຄາພາຍໃນ"
                  >
                    ➕ Add {quantity}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ບໍ່ມີຂໍ້ມູນ Barcode</p>
        )}
      </div>

      {/* Product Groups */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="Product Groups" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-sm text-gray-500">Main Group</p>
            <p className="text-gray-800 font-medium mt-1">
              {product?.MAINGROUP || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">Subgroup 1</p>
            <p className="text-gray-800 font-medium mt-1">
              {product?.SUBGROUP1 || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">Subgroup 2</p>
            <p className="text-gray-800 font-medium mt-1">
              {product?.SUBGROUP2 || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
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
    </div>
  );
};

export default ProductDetailBack;