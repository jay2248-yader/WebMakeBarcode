import React from "react";

const ConfirmModal = ({ title, onConfirm, onCancel, children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-80 p-6 text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        {children && (
          <div className="text-sm text-gray-700 mb-4 text-left">
            {children}
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            ຕົກລົງ
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            ຍົກເລີກ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
