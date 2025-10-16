import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import CSCLogo from "../assets/Logo.svg";
import useLoginForm from "../hook/UseLogin";

const Login = () => {
  const { values, errors, isLoading, handleChange, handleSubmit } = useLoginForm();
  const passwordRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-400 p-4">
<div className="relative overflow-hidden w-56 h-56 flex items-center justify-center bg-white rounded-2xl shadow-md mb-6 -mt-30">
    <img
      src={CSCLogo}
      loading="lazy"
      alt="CSC Logo"
      className="object-contain w-full h-full scale-120 transition-transform duration-500"
    />
  </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-4 space-y-6">
        <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-black text-center mb-5">
          ລະບົບພິມບາໂຄດ
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
