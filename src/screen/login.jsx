import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import CSCLogo from "../assets/image.png";
import useLoginForm from "../hook/UseLogin";

const Login = () => {
  const { values, errors, isLoading, handleChange, handleSubmit } = useLoginForm();
  const passwordRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-400 p-4">
      <img
        src={CSCLogo}
        alt="CSC Logo"
        className="w-45 h-45 -mt-30 mb-5 object-contain rounded-2xl p-2 shadow-md bg-white"
      />
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-4 space-y-6">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-black text-center">
          ລະບົບສ້າງ Barcode
        </h1>

        <div className="flex flex-col w-full space-y-4">
          {/* Username */}
          <Input
            label="ລະຫັດພະນັກງານ"
            placeholder="ໃສ່ລະຫັດພະນັກງານ"
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            maxLength={10}
            errorMessage={errors.username}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
          />

          {/* Password */}
          <Input
            ref={passwordRef}
            label="ລະຫັດຜ່ານ"
            type="password"
            placeholder="ໃສ່ລະຫັດຜ່ານ"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            maxLength={10}
            errorMessage={errors.password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(); // ✅ Enter → login
              }
            }}
          />

          {/* Login Button */}
          <Button
            text={isLoading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
            color="blue"
            size="md"
            fullWidth
            onClick={handleSubmit}
          />

          {errors.general && (
            <p className="text-red-600 text-sm text-center mt-2">
              {errors.general}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
