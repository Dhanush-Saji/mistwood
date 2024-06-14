import { create } from "zustand";
import zukeeper from 'zukeeper'


export const useUserStore = create((set) => ({
    cart:[],
    address:[],
    addToCart:(item)=>{
        set((state)=>{
            cart:[...state.cart,item]
        })
    }
}))
