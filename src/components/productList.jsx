import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./productCard";

const ProductList = ({ products, onLoadMore, hasMore, loading }) => {
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);

  // IntersectionObserver สำหรับ Infinite Scroll
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          setIsFetching(true);
          try {
            await onLoadMore();
          } catch (err) {
            console.error("❌ Load more error:", err);
          } finally {
            setIsFetching(false);
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    observer.observe(currentSentinel);
    
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [isFetching, hasMore, onLoadMore]);

  // 🔄 ถ้ากำลังโหลดครั้งแรก
  if (loading && (!products || products.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">
          ກຳລັງໂຫຼດຂໍ້ມູນ...
        </h2>
        <p className="text-gray-500 text-sm">
          ກະລຸນາລໍຖ້າສັກຄູ່
        </p>
      </div>
    );
  }

  // 🌸 ถ້าไม่มีสินค้า (และไม่ได้กำลังโหลด)
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-inner border border-gray-200">
        {/* SVG กล่องว่าง */}
        <div className="p-6 bg-white rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M3 7l2 14h14l2-14M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">
          ບໍ່ພົບສິນຄ້າ
        </h2>
        <p className="text-gray-500 text-base max-w-sm">
          ບໍ່ພົບສິນຄ້າທີ່ກຳລັງຄົ້ນຫາ ກະລຸນາຄົ້ນຫາດ້ວຍຊື່ ຫຼື ລະຫັດສິນຄ້າ ໃໝ່ອີກຄັ້ງ
        </p>
      </div>
    );
  }

  // 🛒 ถ้ามีสินค้า
  return (
    <div
      className="
        flex flex-col gap-4
        overflow-y-auto p-3 sm:p-4 md:p-5
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
        rounded-xl
        flex-1 min-h-0
        w-full
        transition-all duration-300 ease-in-out
      "
      style={{
        scrollBehavior: "smooth",
        maxHeight: "75vh",
      }}
    >
      {products.map((p, index) => (
        <ProductCard
          key={`${p.CODE}-${index}`}
          code={p.CODE}
          name={p.NAMEEN || p.NAMETH}
          grwarehouse={p.GRWAREHOUSE}
          grlocation={p.GRLOCATION}
          unit={p.STOCKUNIT || p.unit?.SHORTNAME}
        />
      ))}

      {/* sentinel element สำหรับ IntersectionObserver */}
      <div ref={sentinelRef} />

      {isFetching && (
        <p className="text-center text-gray-500 py-2 animate-pulse">
          ກຳລັງໂຫຼດສິນຄ້າເພີ່ມເຕີມ...
        </p>
      )}
    </div>
  );
};

export default ProductList;
