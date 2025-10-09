import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useBarcodeCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        barcodes: [],

        // ➕ เพิ่มบาร์โค้ด
        addBarcode: (barcode) => {
          const current = get().barcodes;
          const index = current.findIndex(
            (item) => item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
          );
          if (index !== -1) {
            // เพิ่มจำนวนและย้าย item ไปท้ายสุด เพื่อให้เรียงตามการเพิ่มล่าสุด
            const existing = current[index];
            const updated = { ...existing, quantity: existing.quantity + 1 };
            const without = current.filter((_, i) => i !== index);
            set({ barcodes: [...without, updated] });
          } else {
            set({ barcodes: [...current, { ...barcode, quantity: 1 }] });
          }
        },

        // ➖ ลดจำนวนทีละ 1
        decreaseBarcode: (barcode) => {
          set({
            barcodes: get().barcodes
              .map((item) =>
                item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          });
        },

        // ❌ ลบออกจากตะกร้า
        removeBarcode: (barcode) => {
          set({
            barcodes: get().barcodes.filter(
              (item) => !(item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE)
            ),
          });
        },

        // 🧹 เคลียร์ทั้งหมด
        clearCart: () => set({ barcodes: [] }),

updateBarcodeName: (barcode, newName) => {
          set({
            barcodes: get().barcodes.map((item) =>
              item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
                ? { ...item, NAME: newName }
                : item
            ),
          });
        },

      }),
      
      {
        name: "BarcodeCartStore", // key ใน localStorage
        getStorage: () => localStorage,
      }
    )
  )
);

export default useBarcodeCartStore;
