import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ProductList from "../components/productList";
import useProducts from "../hook/useHome";
import useAuthStore from "../store/authStore";
import CartIcon from "../components/cartIcon";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateSearch = location.state?.search || "";
  const {
    products,
    loading,
    hasMore,
    search,
    setSearch,
    handleLoadMore,
    handleSearch,
  } = useProducts(10, stateSearch);

  const { user, clearAuth } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const searchInputRef = React.useRef(null); // ref สำหรับ search input

  // Clear location.state after consuming search (prevents re-search on refresh)
  useEffect(() => {
    let isMounted = true;
    
    if (location.state?.search && isMounted) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus ที่ search input เมื่อเข้าหน้า
  useEffect(() => {
    let isMounted = true;
    
    if (searchInputRef.current && isMounted) {
      searchInputRef.current.focus();
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    clearAuth();
    setShowConfirm(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">ກະລຸນາລ໋ອກອິນກ່ອນ</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col items-center min-h-screen bg-sky-400 p-4 space-y-4 flex-1">
        {/* ✅ Cart Icon */}
        <div className="absolute top-4 right-4 z-20">
          <CartIcon />
        </div>

        {/* Profile section */}
        <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-5xl flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm">ລະຫັດພະນັກງານ: {user.code}</p>
            <p className="text-gray-900 font-semibold">{user.name}</p>
          </div>
          <Button text="ອອກຈາກລະບົບ" color="red" size="sm" onClick={handleLogoutClick} />
        </div>

        {/* Search bar */}
        <div className="flex w-full max-w-5xl gap-2">
          <Input
            ref={searchInputRef}
            label=""
            placeholder="ໃສ່ຊື່ສິນຄ້າ ຫຼື ລະຫັດສິນຄ້າ (ກົດ Enter ເພື່ອຄົ້ນຫາ)"
            value={search}
            maxLength={20}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSearch(search);
              }
            }}
          />
          <Button
            text={loading ? "Loading..." : "ຄົ້ນຫາ"}
            color="blue800"
            size="md"
            onClick={() => handleSearch(search)}
            disabled={loading}
          />
        </div>

        {/* Product list container */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-5xl flex-1 min-h-0 flex flex-col overflow-hidden">
          <ProductList
            products={products}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal title="ຢືນຢັນອອກຈາກລະບົບ" onConfirm={confirmLogout} onCancel={cancelLogout}>
          <div className="flex justify-center items-center">
            <p className="text-center">ທ່ານແນ່ໃຈວ່າຕ້ອງການອອກຈາກລະບົບ ຫຼື ບໍ່?</p>
          </div>
        </ConfirmModal>
      )}
    </>
  );
};

export default Home;
