import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./productCard";

const ProductList = ({ products, onLoadMore, hasMore }) => {
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

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

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isFetching, hasMore, onLoadMore]);

  if (!products || !products.length) {
    return <p className="text-center text-gray-600 py-4">No products found.</p>;
  }

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
          key={`${p.CODE}-${index}`} // ✅ unique key
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
        <p className="text-center text-gray-500 py-2">
          Loading more products...
        </p>
      )}
    </div>
  );
};

export default ProductList;
