import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useTokenStore, useUserStore } from "../store/authStore";
import { sanitizeInput } from "../utils/sanitize";

export default function useLoginForm(initialValues = { username: "", password: "" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    const cleanValue = sanitizeInput(value);
    setValues((prev) => ({ ...prev, [field]: cleanValue }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z0-9]{4,}$/.test(values.username)) {
      newErrors.username = "ລະຫັດພະນັກງານຕ້ອງເປັນ a-z,0-9 ແລະຢ່າງໜ້ອຍ 4 ຕົວ";
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = "ລະຫັດຕ້ອງ 6 ຕົວຂຶ້ນໄປ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const cleanUsername = sanitizeInput(values.username);
      const cleanPassword = sanitizeInput(values.password);

      const res = await loginService(cleanUsername, cleanPassword);

      if (res.success && res.data_id?.token) {
        useTokenStore.getState().setToken(res.data_id.token);
        useUserStore.getState().setUser({
          code: res.data_id.CODE,
          name: res.data_id.MYNAMETH,
          closeFlag: res.data_id.CLOSEFLAG,
        });
        navigate("/home");
      }
    } catch (err) {
      if (err.response?.status === 400)
        setErrors({ general: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" });
      else
        setErrors({ general: "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return { values, errors, isLoading, handleChange, handleSubmit };
}
