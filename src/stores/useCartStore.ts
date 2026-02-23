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

          if (selectedOption === "") {
            return {
              modified: false,
              message:
                "Debe seleccionar una opción antes de agregar al carrito",
            };
          }

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

          return { modified: true, message: "Producto en carrito" };
        },

        remove_from_cart: (productID, optionSelected) => {
          const { products } = get();
          const newProducts = products.filter(
            (item) =>
              !(
                item.id === productID && item.optionSelected === optionSelected
              ),
          );
          set({ products: newProducts });
          return { modified: true, message: "Producto eliminado del carrito" };
        },
        clear_cart: () => {
          set({ products: [] });
          return;
        },
        is_on_cart: (productID, optionSelected) => {
          const { products } = get();
          const productInCartIndex = products.findIndex(
            (item) =>
              item.id === productID && item.optionSelected === optionSelected,
          );

          return productInCartIndex;
        },

        discount_quantity: (productID, selectedOption) => {
          const { products } = get();

          const newProducts = products.map((item) => {
            if (
              item.id === productID &&
              item.optionSelected === selectedOption
            ) {
              return {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              };
            }
            return item;
          });

          set({ products: newProducts });
        },
      };
    },
    {
      name: "cart",
    },
  ),
);
