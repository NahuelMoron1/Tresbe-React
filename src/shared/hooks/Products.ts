import { useEffect, useState } from "react";
import { useProductsStore } from "../../stores/useProductsStore";
import { type Product } from "../models/Products";
import { getProduct } from "../services/Products";
import { getProductOptions } from "../services/Options";
import type { Options } from "../models/Options";

export function useProducts() {
  const products = useProductsStore((state) => state.products);
  const currentPage = useProductsStore((state) => state.currentPage);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const searchFetchProducts = useProductsStore(
    (state) => state.searchFetchProducts,
  );
  return { products, currentPage, fetchProducts, searchFetchProducts };
}

export function useProductItem(id: string) {
  const [product, setProduct] = useState<Product>();
  const [options, setOptions] = useState<Options[]>();

  useEffect(() => {
    const fetchProduct = async () => {
      const { product } = await getProduct(id);
      const { productOptions } = await getProductOptions(product.id);
      setProduct(product);
      setOptions(productOptions);
    };
    fetchProduct();
  }, []);

  return { product, options };
}
