import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailList from "../components/productDetailList";
import CartIcon from "../components/cartIcon";
import { fetchProductPrice } from "../services/productDetailService";
import { fetchProductBarcodes } from "../services/productBarcodeService";
import { fetchProducts } from "../services/productService";
import Input from "../components/Input";
import Button from "../components/Button";

const ProductDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  // States
  const [productPrices, setProductPrices] = useState([]);
  const [barcodeData, setBarcodeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search states
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);

  // Add to cart function
  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    // TODO: integrate with cart context
  };

  // Fetch product prices and barcode data
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const priceRes = await fetchProductPrice(code);
        setProductPrices(priceRes?.data_id?.productprices || []);

        const barcodeRes = await fetchProductBarcodes(code);
        setBarcodeData(barcodeRes?.data_id?.products || []);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchApiData();
  }, [code]);

  // Debounced search for suggestions
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setSuggestLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchProducts({ page: 1, limit: 10, search });
        const items = data?.data_id?.products || [];
        setSuggestions(items);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setSuggestLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const handleSelectSuggestion = (product) => {
    setShowDropdown(false);
    setSearch("");
    if (product?.CODE) {
      navigate(`/product/${product.CODE}`);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-sky-400">
        <div className="flex space-x-2 mb-4">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
        <p className="text-white text-lg font-semibold">
          ກຳລັງໂຫຼດຂໍ້ມູນລາຍລະອຽດສິນຄ້າ...
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-sky-400 p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-screen p-4 bg-sky-400 ">
      <CartIcon />

      {/* Search Bar */}
      <div className="w-full max-w-5xl relative">
        <div className="flex w-full gap-2">
          <Input
            placeholder="ໃສ່ຊື່ສິນຄ້າ ຫຼື ລະຫັດສິນຄ້າ"
            value={search}
            maxLength={20}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            text="ຄົ້ນຫາ"
            color="blue800"
            size="md"
            onClick={() => navigate("/home", { state: { search } })}
            disabled={!search}
          />
        </div>

        {/* Dropdown suggestions */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-auto">
            {suggestLoading ? (
              <div className="p-3 text-sm text-gray-500">ກຳລັງໂຫຼດ...</div>
            ) : suggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-gray-400 text-sm">
                {/* No results with simple SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2"
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
                ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ
              </div>
            ) : (
              suggestions.map((item) => (
                <button
                  key={item.CODE}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-100"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {item.NAMEEN || item.NAMETH}
                    </span>
                    <span
                      className="text-xs text-white 
          border border-gray-300 
          bg-blue-500
          rounded-md 
          px-2 py-0.5 
          inline-block 
          mt-1 
          w-fit"
                    >
                      {item.CODE}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Product details list */}
      <div className="w-full max-w-8xl">
        <ProductDetailList
          productPrices={productPrices}
          barcodeData={barcodeData}
          addToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
