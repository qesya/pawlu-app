import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
  cartId: string;
  setCartId: (id: string) => void;
  resetCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: "",
      setCartId: (id: string) => set({ cartId: id }),
      resetCart: () => set({ cartId: "" }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
