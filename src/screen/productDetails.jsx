import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductDetailList from "../components/productDetailList";
import { fetchProductPrice } from "../services/productDetailService";

const ProductDetails = () => {
  const { code } = useParams();
  const [productPrices, setProductPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRan = useRef(false); // ref สำหรับป้องกันรันซ้ำ

  useEffect(() => {
    if (effectRan.current) return; // ถ้าเคยรันแล้วให้ return
    effectRan.current = true;

    const fetchApiData = async () => {
      setLoading(true);
      try {
        const data = await fetchProductPrice(code);
        console.log("API data received:", data);
        if (data?.data_id?.productprices) {
          setProductPrices(data.data_id.productprices);
        } else {
          setProductPrices([]);
        }
      } catch (err) {
        console.error("Error fetching product price:", err);
        setError("Failed to load product prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [code]);

if (loading)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-400">
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
      </div>
      <p className="text-white text-lg font-semibold">ກຳລັງໂຫຼດຂໍ້ມູນລາຍລະອຽດສິນຄ້າ...</p>
    </div>
  );


  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-sky-400">
      <ProductDetailList productPrices={productPrices} />
    </div>
  );
};

export default ProductDetails;
