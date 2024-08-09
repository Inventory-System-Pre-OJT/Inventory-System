import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useStockStore = create((set) => ({
    isPosting:false,
    isGetting:false,
    isSearching:false,
    postStock: async (data) => {
        set({ isPosting:true })
        try{
            const response = await axios.post("/api/v1/stock/postStock", data);
            set({ isPosting:false });
            toast.success("Product created successfully");
        } 
        catch(error){
            toast.error(error.response.data.message || "An error occured" );
            set({ isPosting:false });
        }
    },
    getStock: async () => {
        set({ isGetting:true })
        try{
            const response = await axios.post("/api/v1/stock/getStock");
            set({ isGetting:false });
            toast.success("Product fetched successfully");
        } 
        catch(error){
            toast.error(error.response.data.message || "An error occured" );
            set({ isGetting:false });
        }
    },
    searchStock: async (query) => {
        set({ isSearching:true })
        try{
            const response = await axios.post("/api/v1/stock/searchStock", { params: {query} });
            set({ isSearching:false });
            toast.success("Product search successfully");
        } 
        catch(error){
            toast.error(error.response.data.message || "An error occured" );
            set({ isSearching:false });
        }
    },
    updateStock: async (data) => {
        set({ isUpdating:true })
        try{
            const response = await axios.post("/api/v1/stock/updateStock", data);
            set({ isUpdating:false });
            toast.success("Product updated successfully");
        } 
        catch(error){
            toast.error(error.response.data.message || "An error occured" );
            set({ isUpdating:false });
        }
    },
}));