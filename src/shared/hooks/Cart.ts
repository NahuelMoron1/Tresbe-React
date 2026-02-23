import { useCartStore } from "../../stores/useCartStore";

export function useCart() {
  const cart = useCartStore((state) => state.products);
  const addToCart = useCartStore((state) => state.add_to_cart);
  const removeFromCart = useCartStore((state) => state.remove_from_cart);
  const isOnCart = useCartStore((state) => state.is_on_cart);
  const clear_cart = useCartStore((state) => state.clear_cart);
  const discount_quantity = useCartStore((state) => state.discount_quantity);

  return {
    cart,
    addToCart,
    removeFromCart,
    isOnCart,
    clear_cart,
    discount_quantity,
  };
}
