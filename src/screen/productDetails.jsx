import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductDetailList from "../components/productDetailList";
import CartIcon from "../components/cartIcon";
import { fetchProductPrice } from "../services/productDetailService";
import { fetchProductBarcodes } from "../services/productBarcodeService"; 


const ProductDetails = () => {
  const { code } = useParams();
  const [productPrices, setProductPrices] = useState([]);
  const [barcodeData, setBarcodeData] = useState([]); // ✅ state สำหรับ barcode
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  const handleAddToCart = (item) => {
  console.log("Added to cart:", item);
  // เพิ่ม logic ของ cart context หรือ state
};
  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const fetchApiData = async () => {
      setLoading(true);
      try {
        // ดึงราคาสินค้า
        const data = await fetchProductPrice(code);
        if (data?.data_id?.productprices) {
          setProductPrices(data.data_id.productprices);
        } else {
          setProductPrices([]);
        }

        // ดึงบาร์โค้ด
        const barcodeRes = await fetchProductBarcodes(code);
        if (barcodeRes?.success && barcodeRes.data_id?.products) {
          setBarcodeData(barcodeRes.data_id.products);
        } else {
          setBarcodeData([]);
        }



      } catch (err) {
        console.error("Error fetching product price:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [code]);

  if (loading)
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

  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-sky-400 p-4 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen p-4 bg-sky-400">
      <CartIcon />
      <div className="w-full max-w-8xl">
        {/* ส่ง barcodeData ไปยัง ProductDetailList */}
        <ProductDetailList productPrices={productPrices} barcodeData={barcodeData} addToCart={handleAddToCart}  />
      </div>
    </div>
  );
};

export default ProductDetails;
