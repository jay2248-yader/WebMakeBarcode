// src/pages/Home.jsx
import React from "react";
import { useUserStore } from "../store/authStore";
import { logout } from "../services/authService";
import Button from "../components/Button";
import ProductList from "../components/prductList"; 

const Home = () => {
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    logout(); // ล้าง token + user จาก Zustand + localStorage
    alert("ອອກຈາກລະບົບສຳເລັດ!");
    window.location.reload(); // optional: reload page กลับไปหน้า login
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-200 p-4 space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-black">
          ສະບາຍດີ {user?.name || "ຜູ້ໃຊ້"}
        </h1>
        <p className="text-gray-700">
          ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ Barcode System
        </p>


      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
        <ProductList />
      </div>

              <Button
          text="ອອກຈາກລະບົບ"
          color="red"
          size="md"
          fullWidth
          onClick={handleLogout}
        />
    </div>
  );
};

export default Home;
