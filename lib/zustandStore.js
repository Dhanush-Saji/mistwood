import { create } from "zustand";
import zukeeper from 'zukeeper';


export const useUserStore = create(zukeeper((set) => ({
    cart:[],
    address:[],
    addToCart:(item)=>{
        console.log(item);
        set((state)=>{
            cart:item
        })
    }
})))
