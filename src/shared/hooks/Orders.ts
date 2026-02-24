import { useEffect } from "react";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { useUserStore } from "../../stores/useUserStore";

export function useOrders() {
  const orderProducts = useOrdersStore((state) => state.orderProducts);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetching = async () => {
      await fetchOrders(user.id);
    };
    fetching();
  }, []);

  return { orderProducts };
}
