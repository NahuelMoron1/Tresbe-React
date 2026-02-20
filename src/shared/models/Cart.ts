import type { Product } from "./Products";

export interface CartState {
  products: Product[];
  add_to_cart: (product: Product, selectedOption: string) => void;
  remove_from_cart: (productID: string) => void;
  clear_cart: () => void;
  is_on_cart: (productID: string, optionSelected: string) => number;
}
