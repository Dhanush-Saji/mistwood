import { create } from "zustand";


export const useTaskStore = create((set) => ({
    cart:[],
    address:[],
    addToCart:(item)=>{
        set((state)=>{
            cart:[...state.cart,item]
        })
    }
}))