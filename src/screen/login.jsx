import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import CSCLogo from "../assets/CSCLogo.webp";
import useLoginForm from "../hook/UseLogin";

const Login = () => {
  const { values, errors, isLoading, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-400 p-4">
      
      <img
        src={CSCLogo}
        alt="CSC Logo"
        className="w-45 h-45  -mt-15 mb-5 object-contain rounded-2xl p-2 shadow-md bg-white"
      />

      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-2 sm:p-4 md:p-6 space-y-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center">
          ລະບົບສ້າງ Barcode
        </h1>

        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <Input
            label="ລະຫັດພະນັກງານ"
            placeholder="ໃສ່ລະຫັດພະນັກງານ"
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            maxLength={10}
            errorMessage={errors.username}
          />

          <Input
            label="ລະຫັດຜ່ານ"
            type="password"
            placeholder="ໃສ່ລະຫັດຜ່ານ"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            maxLength={10}
            errorMessage={errors.password}
          />

          <Button
            text={isLoading ? "ກຳລັງເຂົ້າສູ່ລະບົບ..." : "ເຂົ້າສູ່ລະບົບ"}
            color="blue"
            size="md"
            fullWidth
            className="mt-4"
            onClick={() =>
              handleSubmit((values) =>
                alert(
                  `Login Success!\nUsername: ${values.username}\nPassword: ${values.password}`
                )
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
