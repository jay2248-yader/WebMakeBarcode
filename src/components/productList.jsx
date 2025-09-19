import React, { useState } from "react";
import ProductCard from "./productCard";
import Button from "./Button";

const ProductList = ({ products, onLoadMore }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleLoadMore = async () => {
    if (isFetching) return;
    setIsFetching(true);
    console.log("⬇️ Start loading more products...");

    try {
      await onLoadMore();
      console.log("✅ Load more finished");
    } catch (err) {
      console.error("❌ Load more error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  if (!products || !products.length) return <p>No products found.</p>;

  return (
    <div className="flex flex-col gap-6 max-h-[670px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-xl">
      {products.map((p) => (
        <ProductCard
          key={p.CODE}
          code={p.CODE}
          name={p.NAMEEN || p.NAMETH}
          grwarehouse={p.GRWAREHOUSE}
          grlocation={p.GRLOCATION}
          unit={p.STOCKUNIT || p.unit?.SHORTNAME}
        />
      ))}

      <div className="flex justify-center mt-2">
        <Button
          text={isFetching ? "Loading..." : "ເບິ່ງຂໍ້ມູນເພິ່ມເຕີມ"}
          color="blue800"
          onClick={handleLoadMore}
          disabled={isFetching}
        />
      </div>
    </div>
  );
};

export default ProductList;
