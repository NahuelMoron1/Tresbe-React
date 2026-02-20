import { environment } from "../../environments/environment";
import type { Product, ProductData, ProductInfo } from "../models/Products";

const API_URL = environment.endpoint;
const API_PRODUCTS = "api/products/";
export async function getProducts(
  limit: number,
  page: number,
  sorted: string,
  asc: boolean,
) {
  const res = await fetch(
    `${API_URL}${API_PRODUCTS}?seed=123&limit=${limit}&page=${page}&sorted=${sorted}&asc=${asc}`,
  );
  const data = await res.json();

  const productData: ProductData = data;

  const sortedResults: Product[] = productData.products;
  const productInfo: ProductInfo = productData.info;
  return { sortedResults, productInfo };
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_URL}${API_PRODUCTS}${id}`);
  const data = await res.json();

  const product: Product = data;
  return { product };
}

export const searchProducts = async (
  search: string,
  limit: number,
  page: number,
  sorted: string,
  asc: boolean,
) => {
  const response = await fetch(
    `${API_URL}${API_PRODUCTS}searchproducts/react/?q=${search}&seed=123&page=${page}&limit=${limit}&sorted=${sorted}&asc=${asc}`,
  );
  const json = await response.json();

  const productData: ProductData = json;

  const searchedResults: Product[] = productData.products;
  const productInfo: ProductInfo = productData.info;

  return { searchedResults, productInfo };
};
