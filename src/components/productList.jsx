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
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div
      className="
        flex flex-col gap-6 overflow-y-auto p-2
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
        rounded-xl
        max-h-[650px]       /* base: mobile */
        sm:max-h-[650px]    /* ≥640px */
        md:max-h-[650px]    /* ≥768px */
        lg:max-h-[660px]    /* ≥1024px */
        xl:max-h-[660px]    /* ≥1280px */
        2xl:max-h-[750px]  /* ≥1536px */
      "
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
      <div ref={sentinelRef}></div>

      {isFetching && (
        <p className="text-center text-gray-500">Loading more products...</p>
      )}
    </div>
  );
};

export default ProductList;
