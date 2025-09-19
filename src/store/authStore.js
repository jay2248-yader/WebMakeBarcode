// src/store/authStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

// --- Token Store (localStorage key แยก) ---
export const useTokenStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "TokenStore",
      getStorage: () => localStorage,
    }
  )
);

// --- User Store (localStorage key แยก) ---
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "UserStore",
      getStorage: () => localStorage,
    }
  )
);

// --- Main Auth Store (DevTools จะแสดงทั้ง token + user) ---
export const useAuthStore = create(
devtools((set, get) => {
    const initialToken = useTokenStore.getState().token;
    const initialUser = useUserStore.getState().user;

    return {
      token: initialToken,
      user: initialUser,

      setAuth: (token, user) => {
        set({ token, user });
        useTokenStore.getState().setToken(token);
        useUserStore.getState().setUser(user);

        try {
          const decoded = jwtDecode(token);
          const expiresIn = decoded.exp * 1000 - Date.now();

          if (expiresIn > 0) {
            setTimeout(() => get().clearAuth(), expiresIn);
          } else {
            get().clearAuth();
          }
        } catch {
          get().clearAuth();
        }
      },

   clearAuth: () => {
        set({ token: null, user: null });
        useTokenStore.getState().clearToken();
        useUserStore.getState().clearUser();
      },
    };
  })
);

export default useAuthStore;
