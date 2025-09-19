import React, { useState, useEffect, useCallback } from "react";
import { logout } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import ProductList from "../components/productList";
import { fetchProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // สถานะคำค้นหา
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    alert("Logout success!");
    window.location.reload();
  };

  // โหลดสินค้า
  const loadProducts = useCallback(
    async ({ pageNum = 1, limitNum = limit, query = "" } = {}) => {
      try {
        setLoading(true);
        const data = await fetchProducts({
          page: pageNum,
          limit: limitNum,
          search: query,
        });
        setProducts(data.data_id.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // โหลดสินค้าครั้งแรก
  useEffect(() => {
    loadProducts({ pageNum: page, limitNum: limit });
  }, [loadProducts, page, limit]);

  // กดปุ่ม Load More
  const handleLoadMore = async () => {
    const newLimit = limit + 25;
    setLimit(newLimit);
    await loadProducts({ pageNum: page, limitNum: newLimit, query: search });
  };

  // กดปุ่ม Search
  const handleSearch = async () => {
    setPage(1); 
    await loadProducts({ pageNum: 1, limitNum: limit, query: search });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-400 p-4 space-y-6">
      {/* Search bar */}
      <div className="flex w-full max-w-5xl gap-2">
        <Input
          label=""
          placeholder="ໃສ່ຊື່ສິນຄ້າ ຫຼື ລະຫັດສິນຄ້າ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          text={loading ? "Loading..." : "ຄົ້ນຫາ"}
          color="blue800"
          size="md"
          onClick={handleSearch}
          disabled={loading}
        />
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
        <ProductList products={products} onLoadMore={handleLoadMore} />
      </div>

      {/* Logout */}
      <Button
        text="LOGOUT"
        color="red"
        size="md"
        fullWidth
        onClick={handleLogout}
      />
    </div>
  );
};

export default Home;
