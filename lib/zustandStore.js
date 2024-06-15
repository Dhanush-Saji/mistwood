import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// export const useUserStore = create((set) => ({
//   cart: [],
//   address: [],
//   addToCart: (item) => {
//     set((state) => ({
//       ...state,
//       cart: [...item],
//     }));
//   },
// }));
export const useUserStore = create()(
  devtools(persist(
    (set) => ({
      cart: [],
      address: [],
      addToCart: (item) => {
        console.log('updating cart',item);
        set((state) => ({
          ...state,
          cart: [...item],
        }));
      },
    }),
    { name: "cart-store", skipHydration: true }
  ))
);
