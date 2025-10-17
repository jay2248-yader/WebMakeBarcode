import React, { useState } from "react";
import {
  FaBarcode,
  FaWarehouse,
  FaFileInvoice,
  FaBalanceScale,
  FaTag,
} from "react-icons/fa";

const ProductDetailFront = ({
  productData = {},
  DOCNO,
  UNITCODE,
  prices = [],
  barcodes = [],
  addToCart,
}) => {
  const [selectedPrice, setSelectedPrice] = useState(prices[0] || null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currencySuffix, setCurrencySuffix] = useState("KIP");

  const SectionTitle = ({ icon, title }) => (
    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
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
          {value || "ບໍ່ມີຂໍ້ມູນ"}
        </p>
      </div>
    </div>
  );

  const handleAddToCart = (barcode) => {
    if (!selectedPrice) {
      alert("ກະລຸນາເລືອກລາຄາກ່ອນ");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...barcode,
        NAME: productData.NAMETH,
        CODE: productData.CODE,
        PRICE:
          selectedPrice != null
            ? `${selectedPrice} ${currencySuffix}`
            : selectedPrice,
      });
    }

    setQuantity(1);
  };

  return (
    <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-6 w-full max-w-4xl mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-6 border-b border-gradient-to-r from-transparent via-gray-200 to-transparent">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {productData.NAMETH || "ບໍ່ມີຂໍ້ມູນ"}
          </h2>
          <p className="text-2xl text-white mt-1 border border-gray-300 rounded-lg px-3 py-1 inline-block bg-blue-500 shadow-sm">
            {productData.CODE || "ບໍ່ມີຂໍ້ມູນ"}
          </p>
        </div>
      </div>

      {/* Barcodes Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-inner">
        {barcodes && barcodes.length > 0 ? (
          <div className="space-y-4">
            {barcodes.map((bc, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                {/* Section Title with Barcode Text on the same line */}
                <div className="flex items-center mb-2 justify-center">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 shadow-inner">
                      <FaBarcode />
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      ບາໂຄດ :{" "}
                    </span>
                  </div>
                  <p className="font-mono text-lg font-semibold text-gray-800 ml-2 mt-1">
                    {bc.BARCODE}
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
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={quantity}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ""); // ลบอักขระที่ไม่ใช่ตัวเลข
                        setQuantity(
                          val === "" ? 1 : Math.max(1, parseInt(val))
                        );
                      }}
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
                  >
                    ➕ ເພີ່ມ {quantity}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ບໍ່ມີຂໍ້ມູນ Barcode</p>
        )}
      </div>

      {/* Pricing */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="ລາຄາ" />
        {/* Currency Selection */}
        <div className="mb-4">
          <div className="inline-flex gap-1 bg-gray-100 rounded-md p-1">
            {["KIP", "BAHT"].map((curr) => (
              <label
                key={curr}
                className={`cursor-pointer px-3 py-1 rounded transition ${
                  currencySuffix === curr
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="currency"
                  value={curr}
                  checked={currencySuffix === curr}
                  onChange={(e) => setCurrencySuffix(e.target.value)}
                  className="hidden"
                />
                <span className="text-xs font-semibold">
                  {curr === "KIP" ? "₭ KIP" : "฿ BAHT"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Selection */}
        <div className="grid grid-cols-2 gap-4">
          {prices.map((price, index) => (
            <label
              key={index}
              className={`cursor-pointer bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center shadow hover:shadow-lg transition ${
                selectedIndex === index ? "ring-2 ring-green-500" : ""
              }`}
            >
              <input
                type="radio"
                name="price"
                value={price}
                checked={selectedIndex === index}
                onChange={() => {
                  setSelectedPrice(price);
                  setSelectedIndex(index);
                }}
                className="hidden"
              />
              <p className="font-semibold text-sm text-gray-600">
                ລາຄາ {index + 1}
              </p>
              <p className="text-green-700 font-black text-2xl mt-2">
                {price != null ? `${price} ${currencySuffix}` : "ບໍ່ມີຂໍ້ມູນ"}
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* Product Groups */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="ກຸ່ມສິນຄ້າ" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-sm text-gray-500">
              ກຸ່ມຫຼັກ (Main Group)
            </p>
            <p className="text-gray-800 font-medium mt-1">
              {productData.MAINGROUP || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">
              ກຸ່ມຍ່ອຍ 1 (Subgroup 1)
            </p>
            <p className="text-gray-800 font-medium mt-1">
              {productData.SUBGROUP1 || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">
              ກຸ່ມຍ່ອນ 2 (Subgroup 2)
            </p>
            <p className="text-gray-800 font-medium mt-1">
              {productData.SUBGROUP2 || "ບໍ່ມີຂໍ້ມູນ"}
            </p>
          </div>
        </div>
      </div>

      {/* Document No & Unit */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
          {renderInfoItem(
            <FaFileInvoice className="text-lg text-blue-600" />,
            "ເອກະສານເລກທີ",
            DOCNO
          )}
          {renderInfoItem(
            <FaBalanceScale className="text-lg text-purple-600" />,
            "ໜ່ວຍ",
            UNITCODE
          )}
        </div>
      </div>

      {/* Location */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaWarehouse />} title="ສະຖານທີ່" />
        {renderInfoItem(
          <FaWarehouse className="text-lg text-orange-600" />,
          "ສາງ / ສະຖານທີ່",
          `${productData.GRWAREHOUSE || "ບໍ່ມີຂໍ້ມູນ"} / ${
            productData.GRLOCATION || "ບໍ່ມີຂໍ້ມູນ"
          }`
        )}
      </div>
    </div>
  );
};

export default ProductDetailFront;
