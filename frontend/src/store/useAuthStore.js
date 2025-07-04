import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      await useAuthStore.getState().checkAuth();
      toast.success("Signup successful!");
    } catch (err) {
      console.log("Signup Error:", err?.response?.data || err.message);
      toast.error("Signup failed.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true }); // ✅ Fixed typo
    try {
      const res = await axiosInstance.post("/auth/login", data);
      await useAuthStore.getState().checkAuth();
      toast.success("Logged in successfully");
    } catch (err) {
      console.log("Login Error:", err?.response?.data || err.message);
      toast.error("Failed to log in");
    } finally {
      set({ isLoggingIn: false }); // ✅ Fixed typo
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (err) {
console.error("Update Profile Error:", err); // ✅ Logs full error always
      toast.error("Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }, 

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logout Error:", error?.response?.data || error.message);
      toast.error("Failed to log out");
    }
  },
  
}));
