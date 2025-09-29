// src/pages/BarcodeCart.jsx
import React from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import useBarcodeCartStore from "../store/barcodeCartStore";
import { useNavigate } from "react-router-dom";

const BarcodeCart = () => {
  const barcodes = useBarcodeCartStore((state) => state.barcodes);
  const addBarcode = useBarcodeCartStore((state) => state.addBarcode);
  const decreaseBarcode = useBarcodeCartStore((state) => state.decreaseBarcode);
  const removeBarcode = useBarcodeCartStore((state) => state.removeBarcode);
  const clearCart = useBarcodeCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const totalItems = barcodes.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">🛒 Barcode Cart</h1>

        {barcodes.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No items in cart.</p>
        ) : (
          <div className="space-y-4">
            {barcodes.map((item) => (
              <div
                key={item.BARCODE}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-semibold">{item.BARCODETEXT || item.BARCODE}</p>
                  <p className="text-sm text-gray-500">Barcode: {item.BARCODE}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Price: {item.PRICE}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decreaseBarcode(item)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addBarcode(item)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => removeBarcode(item)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-semibold">
                Total Items: {totalItems}
              </p>
              <div className="space-x-2">
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeCart;
