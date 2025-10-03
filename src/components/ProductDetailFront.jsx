// src/components/ProductDetailFront.jsx
import React, { useState } from "react";
import { FaBarcode, FaWarehouse, FaFileInvoice, FaBalanceScale, FaTag } from "react-icons/fa";
import BarcodeDisplay from "./BarcodeDisplay";

const ProductDetailFront = ({ productData = {}, DOCNO, UNITCODE, prices = [], barcodes = [], addToCart }) => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(prices[0] || null);
  const [selectedIndex, setSelectedIndex] = useState(0); // track ปุ่มที่เลือก
  const [quantity, setQuantity] = useState(1); // จำนวนที่จะเพิ่ม

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

  const handleAddToCart = (barcode) => {
    if (!selectedPrice) {
      alert("กรุณาเลือกราคาก่อน");
      return;
    }
    
    // เพิ่มตามจำนวนที่เลือก
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...barcode,
        NAME: productData.NAMETH,
        CODE: productData.CODE,
        PRICE: selectedPrice,
      });
    }
    
    // รีเซ็ตจำนวนกลับเป็น 1
    setQuantity(1);
  };

  return (
    <div className="backdrop-blur-lg bg-white/100 shadow-xl rounded-3xl p-8 w-full max-w-3xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gradient-to-r from-transparent via-gray-200 to-transparent">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{productData.NAMETH || "ບໍ່ມີຂໍ້ມູນ"}</h2>
          <p className="text-2xl text-black mt-1 border border-gray-300 rounded-lg px-3 py-1 inline-block bg-sky-400 shadow-sm">
            {productData.CODE || "ບໍ່ມີຂໍ້ມູນ"}
          </p>
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
        {renderInfoItem(<FaFileInvoice className="text-lg text-blue-600" />, "Document No", DOCNO)}
        {renderInfoItem(<FaBalanceScale className="text-lg text-purple-600" />, "Unit", UNITCODE)}
      </div>

      {/* Pricing */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="Pricing" />
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {prices.map((price, index) => (
            <label
              key={index}
              className={`cursor-pointer bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center shadow hover:shadow-lg transition ${
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
                  setSelectedIndex(index); // track ปุ่มที่เลือก
                }}
                className="hidden"
              />
              <p className="font-semibold text-sm text-gray-600">Price {index + 1}</p>
              <p className="text-green-700 font-black text-2xl mt-2">{price || "ບໍ່ມີຂໍ້ມູນ"}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Product Groups */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="Product Groups" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold text-sm text-gray-500">Main Group</p>
            <p className="text-gray-800 font-medium mt-1">{productData.MAINGROUP || "ບໍ່ມີຂໍ້ມູນ"}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">Subgroup 1</p>
            <p className="text-gray-800 font-medium mt-1">{productData.SUBGROUP1 || "ບໍ່ມີຂໍ້ມູນ"}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-500">Subgroup 2</p>
            <p className="text-gray-800 font-medium mt-1">{productData.SUBGROUP2 || "ບໍ່ມີຂໍ້ມູນ"}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaWarehouse />} title="Location" />
        {renderInfoItem(
          <FaWarehouse className="text-lg text-orange-600" />,
          "Warehouse / Location",
          `${productData.GRWAREHOUSE || "ບໍ່ມີຂໍ້ມູນ"} / ${productData.GRLOCATION || "ບໍ່ມີຂໍ້ມູນ"}`
        )}
      </div>

      {/* Quantity Selection */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <SectionTitle icon={<FaTag />} title="Quantity" />
        <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
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
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <div className="space-y-4">
          {barcodes && barcodes.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {barcodes.map((bc, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow hover:shadow-md transition">
                  <span className="font-mono font-semibold">{bc.BARCODE}</span>
                  {addToCart && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(bc);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      ➕ Add {quantity} to Cart
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBarcodeModal(true);
                }}
                className="mt-2 text-sm text-gray-500 underline"
              >
                View all barcodes
              </button>
            </div>
          ) : (
            <p className="text-gray-500">ບໍ່ມີຂໍ້ມູນ Barcode</p>
          )}
        </div>
      </div>

      {/* Barcode Modal */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full relative shadow-lg mx-4">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={() => setShowBarcodeModal(false)}
            >
              ✖
            </button>
            <BarcodeDisplay barcodes={barcodes} addToCart={handleAddToCart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailFront;
