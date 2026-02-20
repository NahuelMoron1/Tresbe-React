import { useCartStore } from "../../stores/useCartStore";

export function useCart() {
  const cart = useCartStore((state) => state.products);
  const addToCart = useCartStore((state) => state.add_to_cart);
  const isOnCart = useCartStore((state) => state.is_on_cart);

  return { cart, addToCart, isOnCart };
}
