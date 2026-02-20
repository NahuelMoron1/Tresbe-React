import { ListOfProducts } from "../shared/components/products/productsList/ListOfProducts";
import { PageSelector } from "../shared/components/products/productsList/PageSelector";

export function ProductsPage() {
  return (
    <>
      <ListOfProducts />
      <PageSelector />
    </>
  );
}
