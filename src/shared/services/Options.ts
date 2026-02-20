import { environment } from "../../environments/environment";
import type { Options } from "../models/Options";

const API_URL = environment.endpoint;
const API_OPTIONS = "api/options/";

export async function getProductOptions(productID: string) {
  const res = await fetch(`${API_URL}${API_OPTIONS}product/${productID}`);
  const productOptions: Options[] = await res.json();
  productOptions.forEach((product) => {
    product.name = decodeURIComponent(product.name);
  });

  return { productOptions };
}
