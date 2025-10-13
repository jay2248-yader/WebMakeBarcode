import { useState, useCallback, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { sanitizeInput } from "../utils/sanitize";

export default function useHome(initialLimit = 25, initialSearch = "") {
  const [products, setProducts] = useState([]);
  const [limit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    loadProducts({ pageNum: page, query: search });
  }, [loadProducts, page, search]);

  const handleLoadMore = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await loadProducts({ pageNum: nextPage, query: search });
  };

  const handleSearch = async (query) => {
    const cleanSearch = sanitizeInput(query);
    setPage(1);
    setSearch(cleanSearch);
    await loadProducts({ pageNum: 1, query: cleanSearch });
  };

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
