import { Link, useParams } from "react-router-dom";
import { useProductItem } from "../../../hooks/Products";
import "./ProductItem.css";
import { useState } from "react";

export function ProductItem() {
  const { productID } = useParams<{ productID: string }>();
  const { product, options } = useProductItem(productID || "");
  const [selectedOption, setSelectedOption] = useState(""); // Estado opcional

  if (!product) return <div className="loading">Cargando producto...</div>;

  return (
    <div className="product-detail-wrapper">
      <div className="container">
        <Link to="/products" className="back-link">
          ← Volver a productos
        </Link>

        <div className="product-container">
          <div className="product-visuals">
            <div className="main-image-card">
              <img src={product.image} alt={product.name} />
              <span className="category-tag">{product.category}</span>
            </div>
          </div>

          <div className="product-details">
            <span className="brand-label">{product.brand}</span>
            <h1 className="product-title">{product.name}</h1>

            <div className="price-section">
              <span className="current-price">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Selector de Opciones Estilizado */}
            {options && options.length > 0 && (
              <div className="options-section">
                <label htmlFor="product-options" className="options-label">
                  Seleccionar variante:
                </label>
                <div className="select-wrapper">
                  <select
                    id="product-options"
                    className="custom-select"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="" disabled>
                      Elegir una opción...
                    </option>
                    {options.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="features-section">
                <h4>Características principales:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <button className="add-to-cart-btn">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}
