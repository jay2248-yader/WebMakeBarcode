import { useState, useCallback, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { sanitizeInput } from "../utils/sanitize";

export default function useHome(initialLimit = 10, initialSearch = "") {
  const [products, setProducts] = useState([]);
  const [limit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadProducts = useCallback(
    async ({ pageNum = 1, query = "" } = {}) => {
      try {
        setLoading(true);
        const data = await fetchProducts({ page: pageNum, limit, search: query });

        setProducts((prev) =>
          pageNum === 1 ? data.data_id.products : [...prev, ...data.data_id.products]
        );

        setHasMore(data.data_id.products.length === limit);
      } catch (err) {
        console.error("Error loading products:", err);
        
        // ถ้าเป็น authentication error ไม่ต้องแสดง error ใน console เพิ่มเติม
        // เพราะ interceptor จะจัดการ redirect แล้ว
        if (err.response?.status !== 401 && err.response?.status !== 500) {
          console.error("Unexpected error:", err.message);
        }
        
        // Reset products ถ้าเป็น error ในการโหลดครั้งแรก
        if (pageNum === 1) {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // โหลดครั้งแรกเมื่อ component mount
  useEffect(() => {
    if (!isInitialized) {
      loadProducts({ pageNum: 1, query: initialSearch });
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await loadProducts({ pageNum: nextPage, query: search });
  }, [hasMore, loading, page, search, loadProducts]);

  const handleSearch = useCallback(async (query) => {
    if (loading) return; // ป้องกันการ search ซ้ำซ้อน
    const cleanSearch = sanitizeInput(query);
    setPage(1);
    setSearch(cleanSearch);
    await loadProducts({ pageNum: 1, query: cleanSearch });
  }, [loading, loadProducts]);

  return {
    products,
    loading,
    hasMore,
    search,
    setSearch,
    handleLoadMore,
    handleSearch,
  };
}
