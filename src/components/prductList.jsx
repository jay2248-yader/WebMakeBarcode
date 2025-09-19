// src/pages/Home.jsx
import React from "react";
import ProductCard from "../components/productCard";

const Home = () => {
  const products = [
    {
      name: "ພາເລດໄມ້ (พาเลทไม้)",
      barcode: "8850273260616",
      unit: "Pack6",
      price: "449,400.00",
    },
    {
      name: "ເຈວຫອມປັບອາກາດ TAMAGO LIQUID SAKURA",
      barcode: "18850273260613",
      unit: "Pcs",
      price: "74,900.00",
    },
        {
      name: "ພາເລດໄມ້ (พาเลทไม้)",
      barcode: "8850273260616",
      unit: "Pack6",
      price: "449,400.00",
    },
    {
      name: "ເຈວຫອມປັບອາກາດ TAMAGO LIQUID SAKURA",
      barcode: "18850273260613",
      unit: "Pcs",
      price: "74,900.00",
    },
        {
      name: "ພາເລດໄມ້ (พาเลทไม้)",
      barcode: "8850273260616",
      unit: "Pack6",
      price: "449,400.00",
    },
    {
      name: "ເຈວຫອມປັບອາກາດ TAMAGO LIQUID SAKURA",
      barcode: "18850273260613",
      unit: "Pcs",
      price: "74,900.00",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-sky-200 min-h-screen">
      {products.map((p, i) => (
        <ProductCard
          key={i}
          name={p.name}
          barcode={p.barcode}
          unit={p.unit}
          price={p.price}
        />
      ))}
    </div>
  );
};

export default Home;
