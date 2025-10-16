import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const ONE_DAY = 24 * 60 * 60 * 1000; // 24 ชั่วโมง (ใช้จริงภายหลัง)

export const useBarcodeCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        barcodes: [],
        lastUpdated: Date.now(),

        addBarcode: (barcode) => {
          const current = get().barcodes;
          const index = current.findIndex(
            (item) => item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE
          );

          const now = Date.now();
          set({ lastUpdated: now });

          if (index !== -1) {
            const existing = current[index];
            const updated = { ...existing, quantity: existing.quantity + 1 };
            const without = current.filter((_, i) => i !== index);
            set({ barcodes: [...without, updated] });
          } else {
            set({ barcodes: [...current, { ...barcode, quantity: 1 }] });
          }
        },

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

        removeBarcode: (barcode) => {
          set({
            barcodes: get().barcodes.filter(
              (item) => !(item.BARCODE === barcode.BARCODE && item.PRICE === barcode.PRICE)
            ),
          });
        },

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
        name: "BarcodeCartStore",
        getStorage: () => localStorage,
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          const now = Date.now();
          const diff = now - state.lastUpdated;

          // ✅ ถ้าครบเวลาแล้ว เคลียร์ + รีเฟรชหน้า
          if (diff > ONE_DAY) {
            localStorage.removeItem("BarcodeCartStore");
            setTimeout(() => {
              window.location.reload(); // 🔁 รีเฟรชหน้าเว็บอัตโนมัติ
            }, 500);
          } else {
            // ✅ ตั้งเวลาไว้ให้ auto-refresh เมื่อครบ 24 ชั่วโมงหลังจากนี้
            const timeLeft = ONE_DAY - diff;
            setTimeout(() => {
              localStorage.removeItem("BarcodeCartStore");
              window.location.reload();
            }, timeLeft);
          }
        },
      }
    )
  )
);

export default useBarcodeCartStore;
