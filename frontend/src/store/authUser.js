import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user:null,
    isRegistering:false,
    isCheckingAuth:false,
    isLoggingOut:false,
    isLoggingIn:false,
    register: async (credentials) => {
        set({ isRegistering:true })
        try{
            const response = await axios.post("/api/v1/auth/register", credentials);
            set({ user:response.data.user, isRegistering:false });
            toast.success("Account created successfully");
        } 
        catch(error){
            toast.error(error.response.data.message || "An error occured" );
            set({ isRegistering:false, user:null });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
            set({ isLoggingIn: false, user: null });
            return false;
        }
    },

    logout: async (credentials) => {
        set({ isLoggingOut:true });
        try{
            const response = await axios.post("/api/v1/auth/logout", credentials);
            set({ user:response.data.user, isLoggingOut:false });
            toast.success("Logout successfully");
            return true;
        }
        catch(error){
            toast.error(error.response.data.message || "Logout Failed" );
            set({ isLoggingOut:false });
            return false;
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth:true });
        try {
            const response = await axios.post("/api/v1/auth/authCheck");
            set({ user:response.data.user, isCheckingAuth:false});
        } 
        catch (error){
            set({ isCheckingAuth:false, user:null });
        }
    }
}));