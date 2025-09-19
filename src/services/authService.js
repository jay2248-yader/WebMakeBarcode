// src/services/authService.js
import api from "./api";
import useAuthStore from "../store/authStore";

const LOGIN_ROUTE = import.meta.env.VITE_API_LOGIN; 

export const login = async (username, password) => {
  try {
    const res = await api.post(LOGIN_ROUTE, { username, password });
    const { success, data_id } = res.data;

    if (success && data_id?.token) {
      const { setAuth } = useAuthStore.getState();
      setAuth(data_id.token, {
        code: data_id.CODE,
        name: data_id.MYNAMETH,
        closeFlag: data_id.CLOSEFLAG,
      });
    }

    return res.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};

export const logout = () => {
  useAuthStore.getState().clearAuth();
};
