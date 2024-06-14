import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  persist(
    (set) => ({
      cart: [],
      address: [],
      addToCart: (item) => {
        set((state) => ({
          ...state,
          cart: [...item],
        }));
      },
    }),
    { name: "cart-store", skipHydration: true }
  )
);
