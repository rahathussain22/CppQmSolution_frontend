import { create } from "zustand";

const getStoredUser = () => {
  try {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};
const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken") || null;
  } catch {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  accessToken: getStoredToken(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
