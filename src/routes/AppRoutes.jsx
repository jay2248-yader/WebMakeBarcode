import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../screen/login";
import Home from "../screen/Home";
import ProductDetails from "../screen/productDetails"; // ✅ หน้า ProductDetails
import BarcodeCart from "../screen/BarcodeCart"; // ✅ หน้า BarcodeCart
import { useAuthStore } from "../store/authStore";

export default function AppRoutes() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      {/* token  not → Login */}
<Route
  path="/"
  element={
    token === undefined ? <div>Loading...</div> : token ? <Navigate to="/home" /> : <Login />
  }
/>

      {/* Home page */}
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/" />}
      />
      {/* Product details */}
      <Route
        path="/product/:code"
        element={token ? <ProductDetails /> : <Navigate to="/" />}
      />
      {/* Barcode Cart */}
      <Route
        path="/barcode-cart"
        element={token ? <BarcodeCart /> : <Navigate to="/" />}
      />
      {/* fallback page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
