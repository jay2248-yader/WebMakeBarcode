// src/hooks/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useTokenStore, useUserStore } from "../store/authStore";

export default function useLoginForm(initialValues = { username: "", password: "" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // ✅ สำหรับ redirect ไปหน้า Home

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.username) newErrors.username = "ກະລຸນາໃສ່ລະຫັດພະນັກງານ";
    else if (values.username.length < 2) newErrors.username = "ລະຫັດຕ້ອງ 4 ຕົວອັກສອນ";

    if (!values.password) newErrors.password = "ກະລຸນາໃສ່ລະຫັດຜ່ານ";
    else if (values.password.length < 2) newErrors.password = "ລະຫັດຕ້ອງ 6 ຕົວອັກສອນ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await loginService(values.username, values.password);

      if (res.success && res.data_id?.token) {
        // ✅ แยกเก็บ token + user ใน Zustand
        useTokenStore.getState().setToken(res.data_id.token);
        useUserStore.getState().setUser({
          code: res.data_id.CODE,
          name: res.data_id.MYNAMETH,
          closeFlag: res.data_id.CLOSEFLAG,
        });

        // ✅ redirect ไปหน้า Home หลัง login สำเร็จ
        navigate("/home");
      }

      console.log("Login success:", res);
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response?.status === 400)
        setErrors({ general: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" });
      else
        setErrors({
          general: err.response?.data?.message || "Login failed",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return { values, errors, isLoading, handleChange, handleSubmit };
}
