import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; 
// import { signup } from "../../../backend/src/controllers/auth.controller";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth : async() => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({authUser: res.data});
    } catch (error) {
      console.log("Error checking auth:", error);
      set({authUser: null});
      
    }finally{
      set({isCheckingAuth: false});
    }
  },

  signup: async (data) => {
  try {
    set({ isSigningUp: true });
    const res = await axiosInstance.post("/auth/signup", data);
    await useAuthStore.getState().checkAuth(); // Automatically log in after signup
  } catch (err) {
    console.log("Signup Error:", err?.response?.data || err.message);
  } finally {
    set({ isSigningUp: false });
  }
}
}));
