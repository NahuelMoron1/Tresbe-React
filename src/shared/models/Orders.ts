import type { Product } from "./Products";

export interface Orders {
  id: string;
  code: string;
  discount: number;
  delivery: number;
  subtotal: number;
  total: number;
  orderDate: Date;
  userID: string;
  userdataId: string;
  payed: boolean;
  attended: boolean;
  username: string;
  typeOfPayment: string;
  description: string;
}

export interface OrderXproducts {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
}

export interface OrderProducts {
  order: Orders;
  products: Product[];
}

export interface OrdersState {
  orderProducts: OrderProducts[];
  fetchOrders: (userID: string) => Promise<void>;
}
