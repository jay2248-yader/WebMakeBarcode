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

    // ตรวจสอบ token ที่มีอยู่แล้วว่าหมดอายุหรือไม่
    let isValidToken = false;
    if (initialToken) {
      try {
        const decoded = jwtDecode(initialToken);
        const now = Date.now();
        isValidToken = decoded.exp * 1000 > now;
        
        if (!isValidToken) {
          // Token หมดอายุแล้ว ให้ล้างออก
          useTokenStore.getState().clearToken();
          useUserStore.getState().clearUser();
        }
      } catch {
        // Token ไม่ valid ให้ล้างออก
        useTokenStore.getState().clearToken();
        useUserStore.getState().clearUser();
      }
    }

    return {
      token: isValidToken ? initialToken : null,
      user: isValidToken ? initialUser : null,

      setAuth: (token, user) => {
        set({ token, user });
        useTokenStore.getState().setToken(token);
        useUserStore.getState().setUser(user);

        try {
          const decoded = jwtDecode(token);
          const expiresIn = decoded.exp * 1000 - Date.now();

          if (expiresIn > 0) {
            // ล้าง timeout เก่าก่อน (ถ้ามี)
            if (get().timeoutId) {
              clearTimeout(get().timeoutId);
            }
            
            const timeoutId = setTimeout(() => {
              console.log("Token expired, logging out...");
              get().clearAuth();
            }, expiresIn);
            
            set({ timeoutId });
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
        
        // ล้าง timeout ถ้ามี
        if (get().timeoutId) {
          clearTimeout(get().timeoutId);
          set({ timeoutId: null });
        }
      },

      // เพิ่มฟังก์ชันตรวจสอบ token
      isTokenValid: () => {
        const token = get().token;
        if (!token) return false;
        
        try {
          const decoded = jwtDecode(token);
          return decoded.exp * 1000 > Date.now();
        } catch {
          return false;
        }
      },
    };
  })
);

export default useAuthStore;
