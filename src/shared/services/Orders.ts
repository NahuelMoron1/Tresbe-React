import { environment } from "../../environments/environment";
import type { Orders } from "../models/Orders";

const API_URL = environment.endpoint;
const API_OPTIONS = "api/orders/";

export async function getOrders(userID: string) {
  try {
    const res = await fetch(`${API_URL}${API_OPTIONS}user/${userID}`, {
      credentials: "include",
    });
    const orders: Orders[] = await res.json();

    return orders;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getOrderProducts(orderID: string) {
  try {
    const res = await fetch(`${API_URL}api/OrdersXproducts/orders/${orderID}`, {
      credentials: "include",
    });
    const products = await res.json();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
