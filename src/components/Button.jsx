import React, { useState } from "react";

const Button = ({ 
  text, 
  color = "blue", 
  size = "md", 
  onClick, 
  fullWidth = false, 
  className = "" 
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const baseStyles = "px-4 py-3 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const colors = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
  };
  const sizes = {
    sm: "text-sm py-1 px-3",
    md: "text-md py-2 px-4",
    lg: "text-lg py-3 px-6",
  };

  const handleClick = async () => {
    if (isDisabled) return;
    setIsDisabled(true);   // ✅ ปิดการกดทันที
    try {
      await onClick?.();
    } finally {
      setTimeout(() => setIsDisabled(false), 1500); 
      // ✅ เปิดใหม่หลัง 1.5 วิ (กันกดรัวๆ)
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${baseStyles} ${colors[color]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
