import { useEffect, useState } from "react";
import { useProducts } from "../../../hooks/Products";
import { SortBy } from "../../../../types.d";
import "./ListOfProducts.css";
import { SearchProducts } from "./SearchProducts";
import { Link } from "react-router-dom";

export function ListOfProducts() {
  const { products, currentPage, fetchProducts } = useProducts();
  const [sorted, setSorted] = useState<SortBy>(SortBy.NONE);
  const [asc, setAsc] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts(9, currentPage, sorted, asc);
  }, [sorted, currentPage, asc]);

  return (
    <div className="dark-theme-wrapper">
      <div className="container">
        <header className="header">
          <div className="title-section">
            <h1>Productos</h1>
            <p>{products.length} items disponibles</p>
          </div>
          <div>
            <SearchProducts sorted={sorted} limit={9} page={currentPage} asc />
          </div>
          <div className="filters">
            <span>Filtrar por</span>
            <div className="button-group">
              <button
                onClick={() => setSorted(SortBy.NAME)}
                className={
                  sorted === SortBy.NAME ? "sortedSelected" : "sortName"
                }
              >
                Nombre
              </button>
              <button
                onClick={() => setSorted(SortBy.PRICE)}
                className={
                  sorted === SortBy.PRICE ? "sortedSelected" : "sortPrice"
                }
              >
                Precio
              </button>
              <button
                onClick={() => setSorted(SortBy.BRAND)}
                className={
                  sorted === SortBy.BRAND ? "sortedSelected" : "sortBrand"
                }
              >
                Marca
              </button>
              <button
                onClick={() => setSorted(SortBy.CATEGORY)}
                className={
                  sorted === SortBy.CATEGORY ? "sortedSelected" : "sortCategory"
                }
              >
                Categoria
              </button>
            </div>
            <div className="button-group sortMethod">
              <button
                className={
                  sorted !== SortBy.NONE && asc ? "sortedSelected" : "asc"
                }
                onClick={() => {
                  setAsc(true);
                }}
              >
                Asc
              </button>
              <button
                className={
                  sorted !== SortBy.NONE && !asc ? "sortedSelected" : "desc"
                }
                onClick={() => {
                  setAsc(false);
                }}
              >
                Desc
              </button>
            </div>
          </div>
        </header>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="image-container">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="badge">{product.category}</div>
              </div>

              <div className="content">
                <span className="brand-tag">{product.brand}</span>
                <h3>{product.name}</h3>
                <p className="desc">{product.description}</p>

                <div className="card-footer">
                  <div className="price-tag">
                    <span className="currency">$</span>
                    <span className="amount">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    style={{ color: "white" }}
                    to={`/products/${product.id}`}
                  >
                    <button className="buy-btn">Details</button>
                  </Link>{" "}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
