import { create } from "zustand";
import { getOrderProducts, getOrders } from "../shared/services/Orders";
import type { OrderProducts, OrdersState } from "../shared/models/Orders";

export const useOrdersStore = create<OrdersState>()((set) => {
  return {
    orderProducts: [],

    fetchOrders: async (userID: string) => {
      const orders = await getOrders(userID);
      if (!orders) {
        return;
      }
      const orderProductsAux: OrderProducts[] = [];
      await Promise.all(
        orders.map(async (order) => {
          const productsAux = await getOrderProducts(order.id);
          if (productsAux) {
            const orderProduct: OrderProducts = {
              order,
              products: productsAux,
            };
            orderProductsAux.push(orderProduct);
          }
        }),
      );

      set({ orderProducts: orderProductsAux });
    },
  };
});
