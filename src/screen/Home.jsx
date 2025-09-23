import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ProductList from "../components/productList";
import useProducts from "../hook/useHome";
import useAuthStore from "../store/authStore";

const Home = () => {
  const {
    products,
    loading,
    hasMore,
    search,
    setSearch,
    handleLoadMore,
    handleSearch,
  } = useProducts(25);

  // ดึง user และฟังก์ชัน logout จาก store
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    alert("Logout success!");
    window.location.reload(); // หรือ navigate ไปหน้า login แทน
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">ກະລຸນາລ໋ອກອິນກ່ອນ</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-400 p-4 space-y-4">
      {/* Profile section */}
      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-5xl flex items-center justify-between">
        <div>
          <p className="text-gray-700 text-sm">ລະຫັດພະນັກງານ: {user.code}</p>
          <p className="text-gray-900 font-semibold">{user.name}</p>
        </div>
        <Button
          text="LOGOUT"
          color="red"
          size="sm"
          onClick={handleLogout}
        />
      </div>

      {/* Search bar */}
      <div className="flex w-full max-w-5xl gap-2">
        <Input
          label=""
          placeholder="ໃສ່ຊື່ສິນຄ້າ ຫຼື ລະຫັດສິນຄ້າ"
          value={search}
           maxLength={20} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          text={loading ? "Loading..." : "ຄົ້ນຫາ"}
          color="blue800"
          size="md"
          onClick={() => handleSearch(search)}
          disabled={loading}
        />
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
        <ProductList
          products={products}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default Home;
