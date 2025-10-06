import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useBarcodeCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        barcodes: [],

        // ➕ เพิ่มบาร์โค้ด
        addBarcode: (barcode) => {
          const existing = get().barcodes.find(
            (item) => item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
          );
          if (existing) {
            set({
              barcodes: get().barcodes.map((item) =>
                item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          } else {
            set({
              barcodes: [...get().barcodes, { ...barcode, quantity: 1 }],
            });
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
