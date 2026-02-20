import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../shared/models/Cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      return {
        products: [],

        add_to_cart: (product, selectedOption) => {
          const { products } = get();
          const { id } = product;

          product.optionSelected = selectedOption;

          // Buscar por id + optionSelected
          const productInCartIndex = products.findIndex(
            (item) => item.id === id && item.optionSelected === selectedOption,
          );

          let newProducts;

          if (productInCartIndex >= 0) {
            // Ya existe ese producto con esa opción → aumentar quantity
            newProducts = products.map((item, index) =>
              index === productInCartIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          } else {
            // No existe aún esa combinación id + optionSelected → nuevo item
            newProducts = [...products, { ...product, quantity: 1 }];
          }

          set({ products: newProducts });
        },

        remove_from_cart: (productID) => {},
        clear_cart: () => {},
        is_on_cart: (productID, optionSelected) => {
          const { products } = get();
          const productInCartIndex = products.findIndex(
            (item) =>
              item.id === productID && item.optionSelected === optionSelected,
          );

          return productInCartIndex;
        },
      };
    },
    {
      name: "cart",
    },
  ),
);
