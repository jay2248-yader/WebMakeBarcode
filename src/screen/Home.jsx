import React from "react";
import { logout } from "../services/authService";
import Button from "../components/Button";
import Input from "../components/Input";
import ProductList from "../components/productList";
import useProducts from "../hook/useHome";

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

  const handleLogout = () => {
    logout();
    alert("Logout success!");
    window.location.reload();
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
          onClick={() => handleSearch(search)}
          disabled={loading}
        />
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
        <ProductList products={products} onLoadMore={handleLoadMore} hasMore={hasMore} />
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
