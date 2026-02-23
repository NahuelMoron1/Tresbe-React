import type { Product } from "./Products";

export interface CartState {
  products: Product[];
  add_to_cart: (product: Product, selectedOption: string) => CartInfo;
  remove_from_cart: (productID: string, optionSelected: string) => CartInfo;
  clear_cart: () => void;
  is_on_cart: (productID: string, optionSelected: string) => number;
  discount_quantity: (productID: string, selectedOption: string) => void;
}

export interface CartInfo {
  modified: boolean;
  message: string;
}
