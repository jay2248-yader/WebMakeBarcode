// src/hooks/useLoginForm.js
import { useState } from "react";

export default function useLoginForm(initialValues = { username: "", password: "" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!values.username) newErrors.username = "ກະລຸນາໃສ່ລະຫັດພະນັກງານ";
    else if (values.username.length < 4)
      newErrors.username = "ລະຫັດພະນັກງານຕ້ອງມີຢ່າງນ້ອຍ 4 ຕົວອັກສອນ";

    if (!values.password) newErrors.password = "ກະລຸນາໃສ່ລະຫັດຜ່ານ";
    else if (values.password.length < 6)
      newErrors.password = "ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback) => {
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback(values);
    }, 2000);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
