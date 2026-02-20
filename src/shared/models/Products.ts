import type { Feature } from "./Feature";

export interface ProductState {
  products: Product[];
  productInfo: ProductInfo;
  currentPage: number;
  fetchProducts: (
    limit: number,
    page: number,
    sorted: string,
    asc: boolean,
  ) => Promise<void>;
  searchFetchProducts: (
    search: string,
    limit: number,
    page: number,
    sorted: string,
    asc: boolean,
  ) => Promise<void>;
  goNextPage: () => void;
  goPreviousPage: () => void;
  reset: () => void;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  subcategory: string;
  quantity: number;
  description: string;
  features: Feature[];
  discount: number;
  priceDiscount: number;
  optionSelected: string;
  latestID: string;
  sells: number;
  temporaryFile: File | null;
}

export interface ProductInfo {
  total: number;
  pages: number;
  currentPage: number;
  seed: string | string[];
}

export interface ProductData {
  info: ProductInfo;
  products: Product[];
}
