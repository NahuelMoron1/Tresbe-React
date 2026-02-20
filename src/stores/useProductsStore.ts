import { create } from "zustand";
import type { ProductState } from "../shared/models/Products";
import { getProducts, searchProducts } from "../shared/services/Products";

export const useProductsStore = create<ProductState>()((set, get) => {
  return {
    products: [],
    productInfo: { total: 0, pages: 0, currentPage: 0, seed: "" },
    currentPage: 1,

    fetchProducts: async (
      limit: number,
      page: number,
      sorted: string,
      asc: boolean,
    ) => {
      const { sortedResults, productInfo } = await getProducts(
        limit,
        page,
        sorted,
        asc,
      );
      set({ products: sortedResults, productInfo: productInfo });
    },

    searchFetchProducts: async (
      search: string,
      limit: number,
      page: number,
      sorted: string,
      asc: boolean,
    ) => {
      const { searchedResults, productInfo } = await searchProducts(
        search,
        limit,
        page,
        sorted,
        asc,
      );
      set({ products: searchedResults, productInfo: productInfo });
    },

    goNextPage: () => {
      const { currentPage, productInfo } = get();
      const nextPage = currentPage + 1;

      if (nextPage < productInfo.pages) {
        set({ currentPage: nextPage });
      }
    },

    goPreviousPage: () => {
      const { currentPage } = get();
      const previousPage = currentPage - 1;

      if (previousPage > 0) {
        set({ currentPage: previousPage });
      }
    },

    reset: () => {
      set({
        currentPage: 0,
        products: [],
        productInfo: { total: 0, pages: 1, currentPage: 1, seed: "" },
      });
    },
  };
});
