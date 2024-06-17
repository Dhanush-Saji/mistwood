import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      resetStore: () => {
        set((state) => ({ cart: [], address: [] }));
      },
    }),
    { name: "cart-store", skipHydration: true }
  )
);
